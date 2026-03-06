import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import SearchBox from "../../components/Patient/Searchbox";
import { FaMapMarkedAlt, FaMagic, FaSpinner } from "react-icons/fa";

// Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const start: number[] = [77.2090, 28.6139]; // Starting point in New Delhi
  const [endCoords, setEndCoords] = useState<number[] | null>(null);
  const [hospitalMarkers, setHospitalMarkers] = useState<mapboxgl.Marker[]>([]);

  // AI Triage State
  const [disease, setDisease] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);
  const [aiPrediction, setAiPrediction] = useState<{ hospital: string, ward: string } | null>(null);

  // Hardcoded hospital coordinates mapped to Delhi locations for accurate routing
  const hospitalCoordinates: Record<string, number[]> = {
    "AIIMS Bhubaneswar": [77.2088, 28.5672], // Mapped to AIIMS Delhi
    "IGKC Multispeciality hospital": [77.2045, 28.5686], // Mapped to Safdarjung
    "SUM Ultimate": [77.2847, 28.5350], // Mapped to Apollo Delhi
    "ApolloMedicare": [77.2764, 28.5562], // Mapped to Fortis Escorts
  };

  useEffect(() => {
    if (map.current) return; // Initialize map once

    // Initialize the map instance with a dark style
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/dark-v11",
      center: start as [number, number],
      zoom: 12,
    });

    // Add controls to the map
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.ScaleControl({ unit: "metric" }));

    // Add the starting point
    map.current.on("load", () => {
      addStartPoint();
    });

    if (map.current) {
      new mapboxgl.Marker({
        color: "#F59E0B", // amber-500
      })
        .setLngLat(start as [number, number])
        .addTo(map.current);
    }
  }, []);

  // Update endpoint when endCoords changes
  useEffect(() => {
    if (endCoords) {
      updateEndPoint(endCoords);
      getRoute(endCoords);
    }
  }, [endCoords]);

  // Add starting point marker
  const addStartPoint = () => {
    map.current!.addLayer({
      id: "start-point",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: start,
              },
              properties: {
                description: "Start Point",
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 8,
        "circle-color": "#EAB308", // yellow-500
      },
    });
  };

  // Add endpoint marker
  const addEndPoint = (coords: number[]) => {
    const end: GeoJSON.GeoJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coords,
          },
          properties: {
            description: "End Point",
          },
        },
      ],
    };

    if (map.current!.getLayer("end-point")) {
      (map.current!.getSource("end-point") as mapboxgl.GeoJSONSource).setData(
        end
      );
    } else {
      map.current!.addLayer({
        id: "end-point",
        type: "circle",
        source: {
          type: "geojson",
          data: end,
        },
        paint: {
          "circle-radius": 8,
          "circle-color": "#EAB308",
        },
      });
    }
  };

  // Update the end point marker
  const updateEndPoint = (coords: number[]) => {
    if (map.current!.getLayer("end-point")) {
      // Remove existing end point marker if present
      map.current!.removeLayer("end-point");
      map.current!.removeSource("end-point");
    }
    addEndPoint(coords);
  };

  // Fetch and display the route from start to end
  const getRoute = async (end: number[]) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );

    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;

    const geojson: GeoJSON.GeoJSON = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    if (map.current!.getSource("route")) {
      (map.current!.getSource("route") as mapboxgl.GeoJSONSource).setData(
        geojson
      );
    } else {
      map.current!.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#F59E0B", // amber-500
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  };

  // Clear hospital markers
  const clearHospitalMarkers = () => {
    hospitalMarkers.forEach(marker => marker.remove());
    setHospitalMarkers([]);
  };

  // Display hospital markers
  const displayHospitalMarkers = (hospitals: { name: string; coords: [number, number] }[]) => {
    clearHospitalMarkers(); // Clear existing markers first

    const newMarkers = hospitals.map(hospital => {
      const marker = new mapboxgl.Marker({ color: '#EAB308' })
        .setLngLat(hospital.coords as [number, number])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, className: 'dark-popup' }).setHTML(
            `<div class="p-2 bg-gray-900 border border-white/10 rounded-lg"><h4 class="text-white font-bold">${hospital.name}</h4></div>`
          )
        ) // Add styled popup
        .addTo(map.current!);

      return marker;
    });

    setHospitalMarkers(newMarkers);
  };

  const handleTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disease || !arrivalTime) return;

    setIsPredicting(true);
    setAiPrediction(null);
    try {
      // Create mock distance properties matching the Random Forest model expectations
      const payload = {
        "hour_of_day": Number(arrivalTime.split(':')[0]),
        "day_of_week": new Date().toLocaleString('en-us', { weekday: 'long' }),
        "Disease": disease,
        "Distance from AIIMS Bhubaneswar": 500,
        "Distance from IGKC Multispeciality hospital": 600,
        "Distance from SUM Ultimate": 200,
        "Distance from ApolloMedicare": 800
      };

      // Use environment variable for ML API, fallback to localhost
      const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:5000';
      const response = await fetch(`${ML_API_URL}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      setAiPrediction(data);

      // Plot the coordinates on the map automatically!
      if (data.hospital && hospitalCoordinates[data.hospital]) {
        const coords = hospitalCoordinates[data.hospital];
        setEndCoords(coords);
      }

    } catch (error) {
      console.error("Failed to fetch AI Triage prediction", error);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="space-y-6 relative h-full w-full max-w-7xl mx-auto flex flex-col">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gray-500/5 blur-[120px] pointer-events-none rounded-full z-0"></div>

      {/* Header */}
      <div className="relative z-10 mb-2 shrink-0">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <FaMapMarkedAlt className="mr-3 text-yellow-500" />
          Hospital Locator
        </h1>
        <p className="text-gray-400 text-sm mt-1">Find nearby hospitals and get directions from your current location</p>
      </div>

      <div className="relative z-10 shrink-0 mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Manual Search */}
        <div className="bg-gray-900/60 p-5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm flex flex-col justify-center h-full">
          <h3 className="text-gray-300 flex items-center gap-2 text-sm font-semibold mb-4 uppercase tracking-wider">
            <FaMapMarkedAlt className="text-gray-500" /> Manual Location Search
          </h3>
          <SearchBox
            coordsCallback={(coords) => setEndCoords(coords)}
            map={map.current}
            startingPosition={new mapboxgl.LngLat(start[0], start[1])}
          />
        </div>

        {/* AI Triage Prediction Form */}
        <div className="bg-gray-900/60 p-5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm flex flex-col justify-center h-full">
          <h3 className="text-gray-300 text-sm font-semibold mb-4 tracking-wider flex items-center gap-2 uppercase">
            <FaMagic className="text-amber-500" /> AI Hospital Triage
          </h3>

          <form onSubmit={handleTriage} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-gray-500 font-semibold mb-1 block uppercase tracking-wider">Symptoms / Chief Complaint</label>
                <input
                  type="text"
                  placeholder="E.g., High Fever, Broken Bone"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-sm w-full text-white focus:ring-1 focus:border-amber-500 focus:outline-none transition-colors"
                  value={disease}
                  onChange={e => setDisease(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold mb-1 block uppercase tracking-wider">Estimated Arrival Time</label>
                <input
                  type="time"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-sm w-full text-white focus:ring-1 focus:border-amber-500 focus:outline-none transition-colors"
                  value={arrivalTime}
                  onChange={e => setArrivalTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPredicting}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-900 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPredicting ? <FaSpinner className="animate-spin text-gray-900" /> : "Run AI Triage & Plot Route"}
            </button>
          </form>

          {aiPrediction && (
            <div className="mt-4 bg-white/5 border border-amber-500/20 rounded-lg p-3 flex justify-between items-center isolate relative overflow-hidden">
              <div className="absolute inset-0 border-l-4 border-amber-500"></div>
              <div className="pl-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Triage Assignment</p>
                <p className="text-white text-md font-bold">{aiPrediction.hospital}</p>
              </div>
              <div className="text-right pr-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center justify-end gap-1"><FaMapMarkedAlt className="text-amber-500" /> Target Ward</p>
                <p className="text-amber-400 text-md font-bold">{aiPrediction.ward}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 flex-1 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">

        <div
          ref={mapContainer}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default MapComponent;

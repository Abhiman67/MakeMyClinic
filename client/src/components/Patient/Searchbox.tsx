import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { route } from '../../../backendroute';
import mapboxgl, { LngLat } from 'mapbox-gl';
import SideBarHospital from './SideBarHospital';
import { Hospital } from '../../Types';
import { bhubaneswarHospitals } from '../../DB/HospitalLocations';

interface SearchBoxProps {
  coordsCallback: (coords: number[] | null) => void;
  map: mapboxgl.Map | null; // Accept the map instance as a prop
  startingPosition: LngLat; // Starting position for routing
}

const SearchBox: React.FC<SearchBoxProps> = ({ coordsCallback, map, startingPosition }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Hospital[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<number[] | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [routeLayerId, setRouteLayerId] = useState<string | null>(null);

  // Fetch hospitals data from backend
  async function fetchHospitals() {
    try {
      const response = await axios.get(route + '/hospitals');
      setHospitals(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setHospitals(bhubaneswarHospitals);
  }, []);

  useEffect(() => {
    coordsCallback(selectedCoordinates);
  }, [selectedCoordinates]);

  useEffect(() => {
    if (map && selectedCoordinates) {
      clearMarkers();
      renderSingleMarker(selectedCoordinates);
      if (startingPosition) {
        renderRoute(startingPosition, selectedCoordinates);
      }
    }
  }, [map, selectedCoordinates]);

  const clearMarkers = () => {
    markers.forEach(marker => marker.remove());
    setMarkers([]);
    if (map && routeLayerId) {
      map.removeLayer(routeLayerId);
      map.removeSource(routeLayerId);
      setRouteLayerId(null);
    }
  };

  const renderMarkers = (searchTerm: string) => {
    clearMarkers();

    const filteredHospitals = hospitals
      .map(hospital => ({
        ...hospital,
        departments: hospital.departments.filter(department =>
          department.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(hospital => hospital.departments.length > 0);

    const newMarkers = filteredHospitals.map(hospital => {
      const [lat, lng] = hospital.coordinates.map(Number);

      const marker = new mapboxgl.Marker({
        color: "#FF5733",
      })
        .setLngLat([lng, lat])
        .addTo(map!);

      return marker;
    });

    setMarkers(newMarkers);
  };

  const renderSingleMarker = (coords: number[]) => {
    if (map) {
      const [lat, lng] = coords;
      new mapboxgl.Marker({
        color: "#FF5733",
      })
        .setLngLat([lng, lat])
        .addTo(map!);
    }
  };

  const renderRoute = (start: LngLat, endCoords: number[]) => {
    if (map) {
      const [endLat, endLng] = endCoords;
      const routeLayerId = 'route-layer';

      if (map.getSource(routeLayerId)) {
        map.removeLayer(routeLayerId);
        map.removeSource(routeLayerId);
      }

      map.addSource(routeLayerId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [
                  [start.lng, start.lat],
                  [endLng, endLat],
                ],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: routeLayerId,
        type: 'line',
        source: routeLayerId,
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#FF5733',
          'line-width': 5,
        },
      });

      setRouteLayerId(routeLayerId);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentSearch(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
    if (event.target.value) {
      renderMarkers(event.target.value);
    } else {
      clearMarkers();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (hospital: Hospital) => {
    setSearchTerm(hospital.name);
    setDepartmentSearch('');

    // Set coordinates for the selected hospital
    const selectedCoords = hospital.coordinates.reverse().map(Number) as number[];
    setSelectedCoordinates(selectedCoords);

    // Trigger the route rendering via callback
    coordsCallback(selectedCoords);

    setSuggestions([]);
  };

  return (
    <div className="w-full flex flex-col gap-3 relative z-20">

      {/* Department Search */}
      <div className="w-full relative">
        <label className="text-[10px] text-gray-500 font-semibold mb-1 block uppercase tracking-wider">Find By Department</label>
        <div className="flex items-center border border-white/10 rounded-lg bg-black/40 text-white focus-within:ring-1 focus-within:border-amber-500 transition-all shadow-inner">
          <FaSearch className="ml-3 text-gray-500" />
          <input
            type="text"
            value={departmentSearch}
            onChange={handleSearch}
            placeholder="E.g., Surgery, Emergency"
            className="w-full p-2.5 pl-3 border-none bg-transparent focus:outline-none text-sm text-white placeholder-gray-500"
          />
        </div>

        {/* Dropdown suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-white/10 shadow-xl rounded-lg max-h-60 overflow-y-auto z-50">
            {hospitals
              .map(hospital => ({
                ...hospital,
                departments: hospital.departments.filter(department =>
                  department.name.toLowerCase().includes(departmentSearch.toLowerCase())
                ),
              }))
              .filter(hospital => hospital.departments.length > 0)
              .map(hospital => (
                <div
                  key={hospital.id}
                  className="p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-b-0"
                  onClick={() => handleSelectSuggestion(hospital)}
                >
                  <h2 className="text-sm font-bold text-amber-500">{hospital.name}</h2>
                  <ul className="pl-2 mt-1 space-y-1">
                    {hospital.departments.map(department => (
                      <li key={department.id} className="text-gray-300 text-xs">
                        <span className="font-semibold text-white">Dept:</span> {department.name} <br />
                        <span className="text-[10px] text-gray-500">Docs: {department.doctors.map(doc => doc.name).join(', ')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Hospital Search */}
      <div className="w-full relative">
        <label className="text-[10px] text-gray-500 font-semibold mb-1 block uppercase tracking-wider">Find By Name</label>
        <div className="flex items-center border border-white/10 rounded-lg bg-black/40 text-white focus-within:ring-1 focus-within:border-amber-500 transition-all shadow-inner">
          <FaSearch className="ml-3 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for hospitals..."
            className="w-full p-2.5 pl-3 border-none bg-transparent focus:outline-none text-sm text-white placeholder-gray-500"
          />
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-white/10 shadow-xl rounded-lg max-h-60 overflow-y-auto z-50">
            {suggestions.map((hospital) => (
              <li
                key={hospital.id}
                className="flex items-center p-3 cursor-pointer hover:bg-white/5 border-b border-white/5 last:border-b-0 text-sm text-white font-medium transition-colors"
                onClick={() => handleSelectSuggestion(hospital)}
              >
                <FaMapMarkerAlt className="text-amber-500 mr-3" />
                {hospital.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sidebar Hospital */}
      {selectedCoordinates && (
        <SideBarHospital hospitals={hospitals} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default SearchBox;

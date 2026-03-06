import React, { useState, useRef } from "react";
import { FaTimes, FaDownload, FaPlus, FaTrash, FaFileMedical } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Patient {
    id: number;
    name: string;
    serial: string;
    gender: string;
    status: string;
}

interface Props {
    patient: Patient;
    closeModal: () => void;
}

interface Medicine {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
}

const PrescriptionModal: React.FC<Props> = ({ patient, closeModal }) => {
    const [diagnosis, setDiagnosis] = useState("");
    const [notes, setNotes] = useState("");
    const [medicines, setMedicines] = useState<Medicine[]>([]);

    const [newMed, setNewMed] = useState<Medicine>({ name: "", dosage: "", frequency: "", duration: "" });
    const printRef = useRef<HTMLDivElement>(null);

    const handleAddMedicine = () => {
        if (newMed.name) {
            setMedicines([...medicines, newMed]);
            setNewMed({ name: "", dosage: "", frequency: "", duration: "" });
        }
    };

    const handleRemoveMedicine = (index: number) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;

        // Briefly alter styles for better PDF rendering
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = 'white';
        element.style.color = 'black';
        // ensure all child text is black
        const allText = element.querySelectorAll('*');
        const originalStyles: any[] = [];
        allText.forEach((el: any) => {
            originalStyles.push({ el, color: el.style.color });
            el.style.color = 'black';
        });

        try {
            const canvas = await html2canvas(element, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Prescription_${patient.name.replace(/\s+/g, '_')}.pdf`);
        } catch (err) {
            console.error("Failed to generate PDF", err);
        } finally {
            // Revert styles
            element.style.backgroundColor = originalBg;
            originalStyles.forEach(({ el, color }) => {
                el.style.color = color;
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[60] p-4 overflow-y-auto">
            <div className="bg-[#0B0F19] border border-white/10 rounded-2xl shadow-2xl w-full max-w-5xl my-8 relative flex flex-col md:flex-row overflow-hidden">

                {/* Editor Form Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/10 relative z-10">
                    <button
                        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition"
                        onClick={closeModal}
                    >
                        <FaTimes />
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <FaFileMedical className="text-cyan-400 mr-3" />
                        Write Prescription
                    </h2>

                    <div className="space-y-5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div>
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">Diagnosis</label>
                            <input
                                type="text"
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition"
                                placeholder="E.g. Viral Fever"
                            />
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <h3 className="text-gray-300 font-semibold mb-3 text-sm">Add Medicine</h3>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input type="text" placeholder="Medicine Name" className="col-span-2 bg-gray-900/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500" value={newMed.name} onChange={e => setNewMed({ ...newMed, name: e.target.value })} />
                                <input type="text" placeholder="Dosage (e.g. 500mg)" className="bg-gray-900/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500" value={newMed.dosage} onChange={e => setNewMed({ ...newMed, dosage: e.target.value })} />
                                <input type="text" placeholder="Frequency (e.g. 1-0-1)" className="bg-gray-900/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500" value={newMed.frequency} onChange={e => setNewMed({ ...newMed, frequency: e.target.value })} />
                                <input type="text" placeholder="Duration (e.g. 5 days)" className="col-span-2 bg-gray-900/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500" value={newMed.duration} onChange={e => setNewMed({ ...newMed, duration: e.target.value })} />
                            </div>
                            <button onClick={handleAddMedicine} className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center transition border border-white/5">
                                <FaPlus className="mr-2 text-cyan-400" /> Add to Prescription
                            </button>
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">Additional Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition resize-none h-24"
                                placeholder="Dietary advice, next visit details..."
                            />
                        </div>
                    </div>
                </div>

                {/* Live Preview & PDF Generation Section */}
                <div className="w-full md:w-1/2 bg-gray-900 relative flex flex-col">
                    <button
                        className="hidden md:block absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition z-20"
                        onClick={closeModal}
                    >
                        <FaTimes />
                    </button>

                    <div className="flex-1 p-6 md:p-8 overflow-y-auto flex items-center justify-center bg-gray-800/50">
                        {/* The actual element to be captured */}
                        <div
                            ref={printRef}
                            className="bg-white text-gray-900 w-full max-w-[400px] min-h-[500px] shadow-lg rounded p-8 font-serif relative"
                            style={{ backgroundColor: 'white' }}
                        >
                            {/* Header */}
                            <div className="border-b-2 border-gray-800 pb-4 mb-4 text-center">
                                <h1 className="text-2xl font-bold text-cyan-700 font-sans tracking-tight">Make My Clinic</h1>
                                <p className="text-xs text-gray-500 font-sans">123 Health Ave, Medical District • +1 234 567 890</p>
                            </div>

                            {/* Patient Info */}
                            <div className="flex justify-between text-sm mb-6 pb-2 border-b border-gray-200">
                                <div>
                                    <p><span className="font-semibold">Patient:</span> {patient.name}</p>
                                    <p><span className="font-semibold">Gender:</span> {patient.gender}</p>
                                </div>
                                <div className="text-right">
                                    <p><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
                                    <p><span className="font-semibold">ID:</span> #{patient.serial}</p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="mb-6">
                                {diagnosis && (
                                    <div className="mb-4">
                                        <h4 className="font-bold text-sm text-gray-700">Diagnosis:</h4>
                                        <p className="text-sm">{diagnosis}</p>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <div className="text-3xl font-serif text-cyan-800 mb-2 select-none">Rx</div>
                                    {medicines.length === 0 ? (
                                        <p className="text-gray-400 italic text-sm">No medicines prescribed.</p>
                                    ) : (
                                        <ul className="space-y-3">
                                            {medicines.map((med, idx) => (
                                                <li key={idx} className="text-sm flex flex-col group relative">
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-bold">1. {med.name} <span className="text-xs font-normal text-gray-500 ml-1">({med.dosage})</span></span>
                                                        <button onClick={() => handleRemoveMedicine(idx)} className="text-red-500 opacity-0 group-hover:opacity-100 transition"><FaTrash size={12} /></button>
                                                    </div>
                                                    <span className="text-xs ml-4 text-gray-600">Sig: {med.frequency} for {med.duration}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {notes && (
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <h4 className="font-bold text-sm text-gray-700">Notes/Advice:</h4>
                                        <p className="text-sm whitespace-pre-wrap">{notes}</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer Signature */}
                            <div className="absolute bottom-8 right-8 text-center">
                                <div className="w-32 border-b border-gray-800 mb-1"></div>
                                <p className="text-xs font-semibold">Doctor's Signature</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-[#0B0F19] border-t border-white/10 flex justify-end shrink-0">
                        <button
                            onClick={handleDownloadPdf}
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                        >
                            <FaDownload />
                            <span>Download PDF</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrescriptionModal;

import React from 'react';
import { BrainCircuit, Activity, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InfoSection = () => {
    return (
        <section className="py-24 bg-[#0B0F19] relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Stop Guessing. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
                            Start Predicting.
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Legacy hospital software is passive. Make My Clinic is active. By analyzing your patient influx history, our Machine Learning models tell you exactly when you'll face a bed shortage and how long the OPD line will get.
                    </p>

                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 shrink-0">
                                <Activity className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-lg mb-1">Severity-Based Triage</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Emergency patients bypass predictive queues and are routed directly to the nearest available critical care bed.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 shrink-0">
                                <Database className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-lg mb-1">From Data to Action</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Historical admission data is fed into our Random Forest models to optimize future hospital staffing and inventory orders.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Visual Mockup */}
                <div className="relative">
                    <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] rounded-full"></div>
                    <div className="relative bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                            <BrainCircuit className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm font-medium text-white">AI Prediction Engine</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-gray-400 text-sm">Patient Load (Next 2 hrs)</span>
                                <span className="text-red-400 font-bold text-sm">High Intensity</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-gray-400 text-sm">Recommended Ward</span>
                                <span className="text-yellow-400 font-bold text-sm">General Ward B</span>
                            </div>
                            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mt-4">
                                <div className="text-xs text-yellow-300 font-medium mb-1">Estimated Wait Time</div>
                                <div className="text-2xl font-bold text-white tracking-tight">14.5 <span className="text-sm font-normal text-gray-400">mins</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default InfoSection;

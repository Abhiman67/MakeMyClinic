import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        { name: "Dr. Aarav Mehta", role: "Chief Medical Officer", quote: "Make My Clinic eliminated our OPD chaos completely. The waiting time predictor is uncannily accurate." },
        { name: "Emily Chen", role: "Hospital Administrator", quote: "We used to scramble to find available beds during spikes. Now, the dashboard tells us exactly where to route patients." },
        { name: "Sofia Fernandes", role: "Head Nurse", quote: "The real-time sync between the doctor's prescription list and the pharmacy inventory is a lifesaver." },
        { name: "Dr. Rohan Singh", role: "Orthopedic Surgeon", quote: "Patients no longer complain about waiting. They know exactly when their turn is coming on the digital queue." },
        { name: "Priya Sharma", role: "IT Director", quote: "Deploying this was seamless. The roles are perfectly segregated for our staff." },
    ];

    return (
        <section className="py-24 bg-[#0B0F19] overflow-hidden border-t border-white/5 relative">
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Real Voices, Real Impact</h2>
                <p className="text-gray-400">Trusted by healthcare professionals nationwide.</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-6 pb-4">
                    {[...testimonials, ...testimonials].map((t, idx) => (
                        <div key={idx} className="w-[350px] shrink-0 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm whitespace-normal">
                            <Quote className="w-8 h-8 text-yellow-500/50 mb-4" />
                            <p className="text-gray-300 mb-6 leading-relaxed italic">"{t.quote}"</p>
                            <div>
                                <h4 className="font-semibold text-white">{t.name}</h4>
                                <span className="text-sm text-gray-500">{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gradient fades on edges */}
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default Testimonials;

import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Register & Triage",
            desc: "Patients register digitally or via the receptionist. The AI instantly assesses severity and assigns a priority ticket."
        },
        {
            number: "02",
            title: "Real-time Routing",
            desc: "The patient is routed to the waiting queue or emergency ward, with the exact waiting time predicted and updated live via sync."
        },
        {
            number: "03",
            title: "Consult & Admit",
            desc: "Doctors view the queue on their iPad, consult, and directly prescribe or admit the patient to an available bed from their dashboard."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#0a0c14]">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">How Make My Clinic Works</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-16">
                    Three simple steps to transform your hospital's operational efficiency forever.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line for Desktop */}
                    <div className="hidden md:block absolute top-[20%] left-1/6 right-1/6 h-px bg-white/10 translate-y-1/2 -z-10 w-2/3 mx-auto"></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center group relative z-10">
                            <div className="w-16 h-16 rounded-full bg-[#111827] border-2 border-yellow-500/50 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:scale-110 group-hover:border-yellow-400 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300">
                                {step.number}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed px-4">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

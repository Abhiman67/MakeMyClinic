import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-[#0B0F19] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    Ready to Transform <br className="hidden md:block" />
                    Your Hospital?
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    Join modern healthcare facilities using AI to predict wait times, manage beds, and eliminate OPD chaos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate('/register')}
                        className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] w-full sm:w-auto"
                    >
                        Start Modernizing Free
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300 w-full sm:w-auto"
                    >
                        Talk to Our Team
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    No credit card required. 14-day free trial on Pro plans.
                </p>
            </div>
        </section>
    );
};

export default BottomCTA;

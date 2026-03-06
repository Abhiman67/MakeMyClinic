import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
    const tiers = [
        {
            name: "Starter Clinic",
            price: "$0",
            description: "Perfect for single practitioners and small setups.",
            features: ["Up to 50 patients/day", "Basic Queue Management", "Email Support", "1 Admin Account"],
            cta: "Get Started Free",
            popular: false
        },
        {
            name: "Pro Hospital",
            price: "$99",
            period: "/mo",
            description: "Ideal for growing hospitals needing advanced predictions.",
            features: ["Unlimited patients", "AI Bed Recommendations", "Wait Time Predictor", "Role-Based Access (50 users)", "Priority Support"],
            cta: "Start 14-Day Trial",
            popular: true
        },
        {
            name: "Make My Clinic Enterprise",
            price: "Custom",
            description: "For multi-specialty chains and large systems.",
            features: ["Everything in Pro", "Custom API Integrations", "HIPAA Compliance Tools", "Dedicated Account Manager", "On-Premise Deployment Option"],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-[#0B0F19] relative">
            <div className="absolute inset-0 bg-yellow-900/10 blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Simple, Transparent Pricing</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Start free, upgrade when your patient volume grows. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {tiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`relative p-8 rounded-2xl border ${tier.popular
                                ? 'bg-gradient-to-b from-yellow-900/40 to-[#0B0F19] border-yellow-500 shadow-[0_0_30px_rgba(99,102,241,0.2)] md:scale-105 z-10'
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                } backdrop-blur-sm flex flex-col h-full transition-all duration-300`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                                <p className="text-gray-400 text-sm h-10">{tier.description}</p>
                                <div className="mt-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white tracking-tight">{tier.price}</span>
                                    {tier.period && <span className="text-gray-400 font-medium">{tier.period}</span>}
                                </div>
                            </div>

                            <div className="flex-1">
                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-300">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${tier.popular
                                ? 'bg-white text-black hover:bg-gray-100'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}>
                                {tier.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

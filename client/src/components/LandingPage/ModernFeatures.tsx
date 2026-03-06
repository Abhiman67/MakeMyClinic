import React from 'react';
import { Network, Users, Clock, FolderOpen, Bell, MessageCircle } from 'lucide-react';

const Features = () => {
    const cards = [
        {
            title: "Real-time Queue Tracking",
            description: "Patients can track their OPD waiting list live on their phones, eliminating crowded waiting rooms.",
            icon: <Users className="w-6 h-6 text-yellow-400" />
        },
        {
            title: "AI Bed Recommendations",
            description: "Our ML model instantly recommends the best ward and hospital based on current occupancy and disease severity.",
            icon: <Network className="w-6 h-6 text-amber-400" />
        },
        {
            title: "Wait Time Predictor",
            description: "Advanced Python regression models estimate accurate waiting times for patients before they even arrive.",
            icon: <Clock className="w-6 h-6 text-amber-400" />
        },
        {
            title: "Inventory Mastery",
            description: "Track essential medicines, consumables, and get alerts before expiry or stock-outs.",
            icon: <FolderOpen className="w-6 h-6 text-teal-400" />
        },
        {
            title: "Role-Based Workflows",
            description: "Separate dedicated portals for Doctors, Receptionists, Inventory Managers, and Hospital Admins.",
            icon: <Bell className="w-6 h-6 text-pink-400" />
        },
        {
            title: "Instant Patient Admissions",
            description: "Generate tickets and allocate beds digitally. No paper trails, no lost records.",
            icon: <MessageCircle className="w-6 h-6 text-green-400" />
        }
    ];

    return (
        <section id="features" className="py-24 bg-[#0B0F19] relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Features That Scale</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Replace scattered spreadsheets and legacy software with a single, unified intelligent platform.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover-glow"
                    >
                        {/* Soft inner glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-amber-500/0 group-hover:from-yellow-500/10 group-hover:to-amber-500/10 transition-colors duration-500 pointer-events-none"></div>

                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                            {card.icon}
                        </div>

                        <h3 className="text-xl font-semibold mb-3 text-white">{card.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;

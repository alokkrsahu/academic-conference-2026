
import React from 'react';
import { Link } from 'react-router-dom';

interface SpeakerCardProps {
    speaker: any;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="h-64 overflow-hidden relative">
                <img 
                    src={speaker.photo_url || `https://i.pravatar.cc/400?u=${speaker.id}`} 
                    alt={speaker.display_name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-60"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{speaker.display_name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3 uppercase tracking-wide">{speaker.title}</p>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {speaker.affiliation}
                </p>
                <div className="mt-auto">
                    <Link 
                        to={`/speakers/${speaker.id}`} 
                        className="inline-flex items-center text-blue-600 font-bold text-sm group-hover:underline"
                    >
                        View Profile
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SpeakerCard;

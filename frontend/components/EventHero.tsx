
import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
    title: string;
    subtitle?: string;
    startDate: string;
    endDate: string;
    location: string;
}

const EventHero: React.FC<HeroProps> = ({ title, subtitle, startDate, endDate, location }) => {
    return (
        <div className="relative bg-blue-900 text-white overflow-hidden py-24 md:py-32">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?grayscale')] opacity-20 bg-cover bg-center"></div>
            <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                <p className="text-blue-400 font-bold tracking-widest uppercase mb-4 text-sm">Join us for the event of the year</p>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    {title}
                </h1>
                {subtitle && <p className="text-xl md:text-2xl mb-8 text-blue-100/90">{subtitle}</p>}
                
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-10 text-lg">
                    <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{location}</span>
                    </div>
                </div>

                <Link to="/register" className="inline-block bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-lg">
                    Register to Attend
                </Link>
            </div>
        </div>
    );
};

export default EventHero;

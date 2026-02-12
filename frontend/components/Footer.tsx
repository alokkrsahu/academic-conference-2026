
import React, { useContext } from 'react';
import { AppContext } from '../App';

const Footer: React.FC = () => {
    const { event } = useContext(AppContext);

    return (
        <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-8 mb-8">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h2 className="text-white text-xl font-bold mb-2 uppercase tracking-tight">{event?.title || 'Academic Conference 2026'}</h2>
                        <p className="text-sm max-w-sm">Driving innovation through interdisciplinary dialogue and international collaboration.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition">Twitter</a>
                        <a href="#" className="hover:text-white transition">LinkedIn</a>
                        <a href="#" className="hover:text-white transition">Facebook</a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>&copy; 2026 Academic Conference Committee. All Rights Reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                        <a href="#" className="hover:underline">Contact Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

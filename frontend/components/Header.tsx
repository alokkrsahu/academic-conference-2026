
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const Header: React.FC = () => {
    const { event } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-900 uppercase tracking-tight">
                    {event?.title || 'Conference 2026'}
                </Link>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Desktop Nav */}
                <nav className={`${isOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-white border-b md:relative md:top-auto md:w-auto md:bg-transparent md:border-0 md:block`}>
                    <ul className="flex flex-col md:flex-row md:items-center py-4 md:py-0 px-4 md:px-0 space-y-4 md:space-y-0 md:space-x-8 text-sm font-medium text-slate-700">
                        <li><Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">Home</Link></li>
                        <li><Link to="/speakers" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">Speakers</Link></li>
                        <li><Link to="/schedule" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">Schedule</Link></li>
                        <li><Link to="/register" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">Register Now</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

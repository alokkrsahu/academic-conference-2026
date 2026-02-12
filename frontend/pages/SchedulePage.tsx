
import React, { useEffect, useState, useContext } from 'react';
import { getSessions } from '../services/conferenceService';
import { AppContext } from '../App';

const SchedulePage: React.FC = () => {
    const { event } = useContext(AppContext);
    const [sessions, setSessions] = useState<any[]>([]);
    const [activeDate, setActiveDate] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // Get unique dates for tabs based on event start/end
    const dates = [];
    if (event) {
        let current = new Date(event.start_date);
        const end = new Date(event.end_date);
        while (current <= end) {
            dates.push(current.toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
        }
    }

    useEffect(() => {
        if (dates.length > 0 && !activeDate) {
            setActiveDate(dates[0]);
        }
    }, [dates, activeDate]);

    useEffect(() => {
        if (!activeDate) return;
        const fetchSessions = async () => {
            setLoading(true);
            try {
                const data = await getSessions({ day: activeDate });
                setSessions(data.results || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, [activeDate]);

    return (
        <div className="py-16 container mx-auto px-4 max-w-5xl">
            <h1 className="text-4xl font-bold mb-10 text-blue-900">Conference Schedule</h1>

            {/* Date Tabs */}
            <div className="flex overflow-x-auto space-x-2 mb-10 border-b scrollbar-hide">
                {dates.map((date) => (
                    <button
                        key={date}
                        onClick={() => setActiveDate(date)}
                        className={`px-8 py-4 font-bold transition whitespace-nowrap border-b-2 ${
                            activeDate === date 
                            ? 'border-blue-600 text-blue-600' 
                            : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        {new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="p-20 text-center">Loading Sessions...</div>
            ) : sessions.length === 0 ? (
                <div className="p-20 text-center text-slate-500 bg-slate-50 rounded-xl">No sessions scheduled for this day.</div>
            ) : (
                <div className="space-y-6">
                    {sessions.map((session) => (
                        <div key={session.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:border-blue-200 transition-colors flex flex-col md:flex-row">
                            <div className="bg-slate-50 md:w-48 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
                                <span className="text-xl font-bold text-slate-900">
                                    {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="text-sm text-slate-500 uppercase tracking-wider">
                                    - {new Date(session.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="p-6 flex-grow">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    {session.is_keynote && (
                                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-tighter">Keynote</span>
                                    )}
                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-tighter">{session.track || 'Session'}</span>
                                    <span className="text-slate-400 text-sm ml-auto">{session.room_name}</span>
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 mb-2">{session.title}</h3>
                                {session.speaker_names && session.speaker_names.length > 0 && (
                                    <div className="flex items-center space-x-2 text-slate-600 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        <span>{session.speaker_names.join(', ')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SchedulePage;

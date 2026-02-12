
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpeaker } from '../services/conferenceService';
import Loading from '../components/Loading';

const SpeakerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [speaker, setSpeaker] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const data = await getSpeaker(parseInt(id));
                setSpeaker(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) return <Loading message="Loading profile..." />;
    if (!speaker) return <div className="p-20 text-center">Speaker not found.</div>;

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link to="/speakers" className="inline-flex items-center text-blue-600 font-bold mb-8 hover:underline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                    Back to All Speakers
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="md:flex">
                        <div className="md:w-1/3 h-96 md:h-auto">
                            <img 
                                src={speaker.photo_url || `https://i.pravatar.cc/800?u=${speaker.id}`} 
                                alt={speaker.display_name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="md:w-2/3 p-8 md:p-12">
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{speaker.display_name}</h1>
                            <p className="text-xl text-blue-600 font-medium mb-4 uppercase tracking-wide">{speaker.title}</p>
                            <div className="text-lg text-slate-600 mb-8 pb-8 border-b border-slate-100">
                                {speaker.affiliation}
                            </div>
                            
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Biography</h2>
                            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                                {speaker.bio || "No biography available for this speaker."}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {speaker.website && (
                                    <a href={speaker.website} target="_blank" rel="noreferrer" className="bg-slate-100 px-4 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-200 transition">Website</a>
                                )}
                                {speaker.twitter && (
                                    <a href={`https://twitter.com/${speaker.twitter}`} target="_blank" rel="noreferrer" className="bg-blue-50 px-4 py-2 rounded-lg text-blue-600 font-medium hover:bg-blue-100 transition">Twitter</a>
                                )}
                                {speaker.linkedin && (
                                    <a href={`https://linkedin.com/in/${speaker.linkedin}`} target="_blank" rel="noreferrer" className="bg-blue-900 px-4 py-2 rounded-lg text-white font-medium hover:bg-blue-800 transition">LinkedIn</a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {speaker.sessions && speaker.sessions.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-blue-900 mb-8">Sessions with {speaker.display_name}</h2>
                        <div className="grid gap-6">
                            {speaker.sessions.map((session: any) => (
                                <Link 
                                    to="/schedule" 
                                    key={session.id} 
                                    className="block bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-300 transition group"
                                >
                                    <div className="flex items-center text-sm text-slate-500 mb-2">
                                        <span className="font-bold text-blue-600 mr-2 uppercase tracking-tighter">
                                            {new Date(session.start_time).toLocaleDateString(undefined, { weekday: 'long' })}
                                        </span>
                                        <span>{new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span className="mx-2">&bull;</span>
                                        <span>{session.room_name}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition">{session.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeakerPage;

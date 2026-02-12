
import React, { useEffect, useState } from 'react';
import { getSpeakers } from '../services/conferenceService';
import SpeakerCard from '../components/SpeakerCard';
import Loading from '../components/Loading';

const SpeakersPage: React.FC = () => {
    const [speakers, setSpeakers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const data = await getSpeakers();
                setSpeakers(data.results || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSpeakers();
    }, []);

    if (loading) return <Loading message="Meet our speakers..." />;

    return (
        <div className="py-16 container mx-auto px-4">
            <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-900">Distinguished Speakers</h1>
            <p className="text-center text-slate-500 mb-16 max-w-2xl mx-auto text-lg leading-relaxed">
                Meet the visionary researchers and practitioners sharing their insights at <span className="text-blue-600 font-semibold text-xl">Academic Conference 2026</span>.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {speakers.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
            </div>
        </div>
    );
};

export default SpeakersPage;

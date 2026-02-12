
import React, { useContext } from 'react';
import { AppContext } from '../App';
import EventHero from '../components/EventHero';

const LandingPage: React.FC = () => {
    const { event, loading } = useContext(AppContext);

    if (loading) return <div className="p-20 text-center text-slate-500">Loading Conference Data...</div>;

    return (
        <div>
            <EventHero 
                title={event.title}
                subtitle={event.subtitle}
                startDate={event.start_date}
                endDate={event.end_date}
                location={event.location}
            />

            <section className="py-20 container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-blue-900">About the Conference</h2>
                        <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
                            <p>{event.description}</p>
                            <p>Located at <span className="font-semibold">{event.address}</span>, this year's conference brings together leading minds to discuss cutting-edge topics.</p>
                        </div>
                        <div className="mt-8">
                            <h3 className="font-bold mb-2">Have Questions?</h3>
                            <a href={`mailto:${event.contact_email}`} className="text-blue-600 hover:underline">{event.contact_email}</a>
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img src="https://picsum.photos/seed/conf/800/600" alt="Venue" className="w-full h-auto" />
                    </div>
                </div>
            </section>

            <section className="bg-slate-100 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Conference Tracks</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {['AI & Ethics', 'Sustainable Growth', 'Digital Policy', 'Modern Pedagogy'].map((track, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                    {i + 1}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{track}</h3>
                                <p className="text-sm text-slate-500">Engaging sessions and workshops led by industry leaders.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

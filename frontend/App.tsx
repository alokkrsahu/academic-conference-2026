
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SpeakersPage from './pages/SpeakersPage';
import SpeakerPage from './pages/SpeakerPage';
import SchedulePage from './pages/SchedulePage';
import RegistrationPage from './pages/RegistrationPage';
import { getEvent } from './services/conferenceService';

interface AppContextType {
    event: any;
    loading: boolean;
}

export const AppContext = createContext<AppContextType>({ event: null, loading: true });

const App: React.FC = () => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEvent();
                setEvent(data);
            } catch (err) {
                console.error("Failed to fetch event:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, []);

    return (
        <AppContext.Provider value={{ event, loading }}>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/speakers" element={<SpeakersPage />} />
                            <Route path="/speakers/:id" element={<SpeakerPage />} />
                            <Route path="/schedule" element={<SchedulePage />} />
                            <Route path="/register" element={<RegistrationPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AppContext.Provider>
    );
};

export default App;

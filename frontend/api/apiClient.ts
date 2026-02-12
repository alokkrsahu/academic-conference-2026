
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
});

// Mock Data for static preview
const MOCK_DATA = {
    event: {
        id: 1,
        title: "Academic Conference 2026",
        subtitle: "Interdisciplinary Research and Innovation",
        description: "Three days of talks, posters, and workshops exploring the future of academic research. Join world-leading experts as we dive into the most pressing challenges and exciting opportunities in contemporary academia.",
        start_date: "2026-06-15",
        end_date: "2026-06-17",
        location: "University of Example, Example City",
        address: "1 Example Road, Example City, EX1 1EX",
        contact_email: "info@academic2026.example"
    },
    rooms: [
        { id: 1, name: "Hall A", capacity: 250, location_notes: "Main Building, 1st Floor" },
        { id: 2, name: "Hall B", capacity: 120, location_notes: "North Wing, Ground Floor" },
        { id: 3, name: "Room 101", capacity: 40, location_notes: "Basement Lab Area" }
    ],
    speakers: [
        {
            id: 1, first_name: "Alice", last_name: "Marshall", display_name: "Dr. Alice Marshall",
            title: "Professor of Cybernetics", affiliation: "University of Example",
            bio: "Dr. Alice Marshall is a pioneer in the field of human-machine interaction. Her work focuses on the ethical integration of robotic control systems into daily life. She has published over 100 papers and held keynote slots at major international symposia.",
            email: "alice@example.edu", website: "https://example.edu/alice", twitter: "@DrAliceM", linkedin: "alice-marshall-dr",
            photo_url: "https://i.pravatar.cc/400?u=alice"
        },
        {
            id: 2, first_name: "Ben", last_name: "O'Connor", display_name: "Prof. Ben O'Connor",
            title: "Professor of Data Science", affiliation: "Example Institute",
            bio: "Professor O'Connor leads the Big Data Lab at the Example Institute. His research specializes in statistical modeling for large-scale social networks and predictive analytics in public policy.",
            email: "ben@example.org", website: "https://example.org/ben", twitter: "@BenDataSci", linkedin: "ben-oconnor",
            photo_url: "https://i.pravatar.cc/400?u=ben"
        },
        {
            id: 3, first_name: "Chen", last_name: "Li", display_name: "Dr. Chen Li",
            title: "AI Researcher", affiliation: "Example Institute",
            bio: "Dr. Li's research focuses on the intersection of deep learning and environmental science. She is particularly interested in how AI can be leveraged to track climate change in real-time.",
            email: "chen.li@example.org", photo_url: "https://i.pravatar.cc/400?u=chen"
        }
    ],
    sessions: [
        {
            id: 1, title: "Opening Keynote: The Future of Interdisciplinary Research",
            abstract: "A deep dive into how collaborative efforts across domains are shaping our world. This session explores the methodology of true interdisciplinary work and the institutional barriers that still exist.",
            start_time: "2026-06-15T09:30:00Z", end_time: "2026-06-15T10:30:00Z",
            room_name: "Hall A", is_keynote: true, track: "General",
            speaker_names: ["Dr. Alice Marshall"], speakers: [1]
        },
        {
            id: 2, title: "Machine Learning in Social Science",
            abstract: "Discussing the ethics and applications of ML in studying human behavior. We will look at case studies where algorithmic bias was identified and corrected using community-led approaches.",
            start_time: "2026-06-15T11:00:00Z", end_time: "2026-06-15T12:00:00Z",
            room_name: "Hall B", is_keynote: false, track: "AI & Society",
            speaker_names: ["Prof. Ben O'Connor"], speakers: [2]
        },
        {
            id: 3, title: "Workshop: Reproducible Research",
            abstract: "Hands-on session on using Docker and Git for ensuring your research results can be verified and built upon by others. Please bring a laptop with a modern web browser.",
            start_time: "2026-06-15T14:00:00Z", end_time: "2026-06-15T15:00:00Z",
            room_name: "Room 101", is_keynote: false, track: "Methods",
            speaker_names: ["Dr. Chen Li"], speakers: [3]
        }
    ]
};

// Enable mocking if the backend is likely unavailable (for preview purposes)
const USE_MOCK = true;

if (USE_MOCK) {
    apiClient.interceptors.request.use(async (config) => {
        // Return a mock response for common endpoints
        if (config.url?.includes('/event/')) {
            config.adapter = async () => ({
                data: MOCK_DATA.event,
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
            });
        } else if (config.url?.includes('/speakers/')) {
            const id = config.url.split('/').filter(Boolean).pop();
            const speakerId = parseInt(id || '');
            if (!isNaN(speakerId)) {
                config.adapter = async () => ({
                    data: MOCK_DATA.speakers.find(s => s.id === speakerId),
                    status: 200, statusText: 'OK', headers: {}, config,
                });
            } else {
                config.adapter = async () => ({
                    data: { results: MOCK_DATA.speakers, count: MOCK_DATA.speakers.length },
                    status: 200, statusText: 'OK', headers: {}, config,
                });
            }
        } else if (config.url?.includes('/sessions/')) {
            config.adapter = async () => ({
                data: { results: MOCK_DATA.sessions, count: MOCK_DATA.sessions.length },
                status: 200, statusText: 'OK', headers: {}, config,
            });
        } else if (config.url?.includes('/registrations/')) {
            config.adapter = async () => ({
                data: { id: 99, status: 'success' },
                status: 201, statusText: 'Created', headers: {}, config,
            });
        }
        return config;
    });
}

export default apiClient;

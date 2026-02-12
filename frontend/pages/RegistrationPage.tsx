
import React, { useState } from 'react';
import { createRegistration } from '../services/conferenceService';

const RegistrationPage: React.FC = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        affiliation: '',
        ticket_type: 'attendee',
        dietary_requirements: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await createRegistration(formData);
            setSubmitted(true);
        } catch (err: any) {
            setError(err.response?.data?.email ? 'This email is already registered.' : 'Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-4 py-24 text-center max-w-lg">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
                <p className="text-slate-600 mb-8">Thank you for registering for Academic Conference 2026. A confirmation email has been sent to your address.</p>
                <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold hover:underline">Register another attendee</button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 py-16">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-blue-900 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">Registration</h1>
                        <p className="text-blue-200">Fill out the form below to secure your spot.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">Email Address</label>
                                <input 
                                    required
                                    type="email" 
                                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Affiliation (University / Organization)</label>
                            <input 
                                type="text" 
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                value={formData.affiliation}
                                onChange={(e) => setFormData({...formData, affiliation: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Ticket Type</label>
                            <select 
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                                value={formData.ticket_type}
                                onChange={(e) => setFormData({...formData, ticket_type: e.target.value})}
                            >
                                <option value="attendee">General Attendee</option>
                                <option value="student">Student</option>
                                <option value="speaker">Invited Speaker</option>
                                <option value="press">Press / Media</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Dietary Requirements (Optional)</label>
                            <textarea 
                                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                rows={2}
                                placeholder="E.g. Vegetarian, Nut Allergy..."
                                value={formData.dietary_requirements}
                                onChange={(e) => setFormData({...formData, dietary_requirements: e.target.value})}
                            ></textarea>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" required className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                            <label className="text-sm text-slate-600">I agree to the conference terms and data privacy policy.</label>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit" 
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition transform active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Complete Registration'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;

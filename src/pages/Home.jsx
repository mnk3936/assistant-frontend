import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState('');

    const getUsersNameByMobile = async (mobile) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5002/number?mobile=${mobile}`, {
                method: "GET", // GET request
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.name;
        } catch (err) {
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async () => {
        if (!mobile) return alert("Please enter a valid mobile number");

        const username = await getUsersNameByMobile(mobile);
        if (!username) return alert("User not found");

        navigate('/chat', { state: { mobile, username } });
        console.log("Navigating to chat with:", { mobile, username });

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative">

            {/* Back Button */}


            <div className="w-full max-w-sm">
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 relative">
                    <div className="space-y-8">

                        {/* Header */}
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Enter Phone Number</h2>
                        </div>

                        {/* Input Group */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-300">
                                PHONE NUMBER
                            </label>
                            <div className="relative group">
                                <input
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-4 bg-black/20 border border-white/10 rounded-xl placeholder-gray-400 
                           text-white text-lg font-medium transition-all duration-300
                           focus:outline-none focus:border-cyan-400 focus:bg-black/30
                           group-hover:border-white/20"
                                />
                                <div className="absolute inset-y-0 right-4 flex items-center">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold 
                rounded-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-[1.02] 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'SUBMIT'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

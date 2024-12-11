import React, { useState } from 'react';

export default function Dashboard({ auth }) {
    const [activeTab, setActiveTab] = useState('create'); // Manage active tab state
    const [lobbyName, setLobbyName] = useState(''); // Manage lobby name state

    const handleCreateLobby = (e) => {
        e.preventDefault();
        console.log(`Lobby Name: ${lobbyName}`); // Log the entered lobby name
        // Placeholder for lobby creation logic
        // You would typically call a backend API here
    };

    const handleFindLobby = (e) => {
        e.preventDefault();
        console.log('Find Lobby');
        // Placeholder for finding a lobby
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Right User Section */}
            <div className="absolute top-4 right-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">
                        {auth.user.name}
                    </span>
                </div>
                <button 
                    onClick={() => window.location.href = '/profile'}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Lobby Management Section */}
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                    <div className="flex border-b">
                        <button 
                            className={`w-1/2 py-2 ${activeTab === 'create' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('create')}
                        >
                            Create Lobby
                        </button>
                        <button 
                            className={`w-1/2 py-2 ${activeTab === 'find' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('find')}
                        >
                            Find Lobby
                        </button>
                    </div>

                    {activeTab === 'create' && (
                        <form onSubmit={handleCreateLobby} className="space-y-4">
                            <div>
                                <label htmlFor="lobbyName" className="block text-sm font-medium text-gray-700">
                                    Lobby Name
                                </label>
                                <input 
                                    type="text" 
                                    id="lobbyName"
                                    value={lobbyName} // Bind input value to state
                                    onChange={(e) => setLobbyName(e.target.value)} // Update state on input change
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                    placeholder="Enter lobby name"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Create Lobby
                            </button>
                        </form>
                    )}

                    {activeTab === 'find' && (
                        <form onSubmit={handleFindLobby} className="space-y-4">
                            <div>
                                <label htmlFor="lobbyCode" className="block text-sm font-medium text-gray-700">
                                    Lobby Code
                                </label>
                                <input 
                                    type="text" 
                                    id="lobbyCode"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                    placeholder="Enter lobby code"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            >
                                Join Lobby
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

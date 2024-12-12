import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import CreateLobbyModal from './CreateLobbyModal';

export default function LobbiesIndex({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { lobbies } = usePage().props; // Extract auth from usePage()
    
    return (
        <div className="container mx-auto px-4 py-6">
            <Head title="Game Lobbies" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Active Game Lobbies</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Create New Lobby
                </button>
            </div>

            {/* Existing lobbies grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lobbies.data.map((lobby) => (
                    <div 
                        key={lobby.id} 
                        className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{lobby.name}</h2>
                            <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                                Lobby #{lobby.code}
                            </span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                Created by: {lobby.creator?.name || 'Anonymous'}
                            </p>
                            <div className="flex justify-between items-center">
                                <Link 
                                    href={`/api/lobbies/${lobby.id}`} 
                                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                                >
                                    Join Lobby
                                </Link>
                                <span className="text-xs text-gray-500">
                                    {new Date(lobby.created_at).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {lobbies.last_page > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: lobbies.last_page }, (_, i) => i + 1).map((page) => (
                        <Link
                            key={page}
                            href={`/api/lobbies?page=${page}`}
                            className={`px-4 py-2 border rounded ${
                                page === lobbies.current_page 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-white text-gray-700'
                            }`}
                        >
                            {page}
                        </Link>
                    ))}
                </div>
            )}

            {/* Create Lobby Modal */}
            <CreateLobbyModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                auth={auth}
            />
        </div>
    );
}

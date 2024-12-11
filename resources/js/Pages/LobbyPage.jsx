import React from 'react';

export default function LobbyPage({ lobby }) {
    // Pārbaudām, vai lobby dati ir pieejami
    if (!lobby) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center">Lobby Created!</h2>
                    <div className="mt-4 text-center">
                        <p><strong>Lobby Name:</strong> {lobby.name}</p>
                        <p><strong>Lobby Code:</strong> {lobby.code}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

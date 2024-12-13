import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Head, Link, usePage } from '@inertiajs/react';
import { Users, LogOut, UserPlus, Copy, Trophy, Settings, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LobbyPage({ lobby, auth }) {
    const [copied, setCopied] = useState(false);
    const [players, setPlayers] = useState([]); // Ensure players is an array
    const [inviteEmail, setInviteEmail] = useState('');

    // Fetch participants when the component mounts
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`/api/lobbies/${lobby.id}`);
                // Make sure response.data.players exists and is an array
                if (Array.isArray(response.data.players)) {
                    setPlayers(response.data.players);
                } else {
                    setPlayers([]); // Default to empty array if players data is malformed
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, [lobby.id]);

    const copyLobbyCode = () => {
        navigator.clipboard.writeText(lobby.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleInvitePlayer = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/lobbies/${lobby.id}/invite`, { email: inviteEmail });
            setInviteEmail('');
            // Add success notification logic here
        } catch (error) {
            // Add error handling logic here
        }
    };

    const leaveLobby = async () => {
        try {
            await axios.post(`/api/lobbies/${lobby.id}/leave`);
            // Redirect to lobbies page or show a modal
            window.location.href = '/api/lobbies';
        } catch (error) {
            // Add error handling logic
            console.error('Error leaving lobby:', error);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative"
        >
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Head title={`Lobby: ${lobby.name}`} />

                {/* Lobby Header */}
                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 mb-8"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                {lobby.name}
                                {lobby.game_ranking === 'ranked' && (
                                    <Trophy className="ml-2 text-yellow-500" />
                                )}
                            </h1>
                            <div className="mt-2 flex items-center space-x-2">
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                                    Lobby Code: {lobby.code}
                                </span>
                                <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    onClick={copyLobbyCode}
                                    className="text-gray-500 hover:text-blue-600"
                                >
                                    {copied ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </motion.button>
                            </div>
                        </div>
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={leaveLobby}
                            className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Leave Lobby</span>
                        </motion.button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Players Section */}
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="md:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold flex items-center">
                                <Users className="mr-2 text-gray-500" />
                                Players ({players.length}/{lobby.max_players})
                            </h2>
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
                            >
                                <Settings className="w-5 h-5" />
                            </motion.button>
                        </div>
                        <div className="space-y-4">
                            {players.map((player) => (
                                <motion.div 
                                    key={player.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-xl"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            {player.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium">{player.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {player.status || 'Waiting'}
                                            </p>
                                        </div>
                                    </div>
                                    {player.id === lobby.creator_id && (
                                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
                                            Host
                                        </span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Invite Player Section */}
                    <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6"
                    >
                        <h2 className="text-2xl font-semibold mb-4 flex items-center">
                            <UserPlus className="mr-2 text-gray-500" />
                            Invite Players
                        </h2>
                        <form onSubmit={handleInvitePlayer} className="space-y-4">
                            <input 
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="Enter player email"
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 transition-all"
                                required
                            />
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Send Invite</span>
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

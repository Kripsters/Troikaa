import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function CreateLobbyModal({ isOpen, onClose, auth }) {
    const [loading, setLoading] = useState(false); // Manage loading state
    const [error, setError] = useState(null); // Manage error messages
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    // Using useForm hook to manage form data
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', // Lobby name is part of the form data
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Ensure auth is available before proceeding
        if (!auth?.user) {
            setError('User is not authenticated.');
            setLoading(false);
            return;
        }

        try {
            // Send data to backend to create the lobby
            const response = await axios.post('/api/lobbies', {
                name: data.name, // Use data.name directly
                creator_id: auth.user.id, // Pass the authenticated user ID
            });

            // Get the new lobby ID from the response
            const lobbyId = response.data.id;

            console.log('Lobby Created:', response.data);

            // Redirect to the new lobby page
            window.location.href = `/api/lobbies/${lobbyId}`;

            // Reset the form data and close the modal
            reset(); // This will clear the form data
            onClose(); // Close the modal

        } catch (err) {
            console.error('Error creating lobby:', err);
            setError(err.response?.data?.message || 'Failed to create lobby. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Create New Lobby</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label 
                            htmlFor="lobbyName" 
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Lobby Name
                        </label>
                        <input
                            id="lobbyName"
                            type="text"
                            value={data.name}  // Use data.name from useForm
                            onChange={(e) => setData('name', e.target.value)}  // Update data.name
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter lobby name"
                            required
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}  // Disable button if processing
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Lobby'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

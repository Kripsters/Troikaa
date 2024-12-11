import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LobbyPage({ lobby }) {
    const [deckId, setDeckId] = useState(null);
    const [remainingCards, setRemainingCards] = useState(52); // Default deck starts with 52 cards
    const [backCards, setBackCards] = useState([]); // Cards showing back
    const [frontCards, setFrontCards] = useState([]); // Cards showing front

    // Fetch a new deck of cards when the component mounts
    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                setDeckId(response.data.deck_id);
            } catch (err) {
                console.error("Error fetching deck:", err);
            }
        };

        fetchDeck();
    }, []);

    // Function to draw cards from the deck
    const drawCards = async () => {
        if (!deckId) return;

        try {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`);
            const newCards = response.data.cards;
            setBackCards(newCards.slice(0, 3)); // First 3 cards will show back
            setFrontCards(newCards.slice(3, 6)); // Last 3 cards will show front
            setRemainingCards(response.data.remaining); // Update the remaining cards count
        } catch (err) {
            console.error("Error drawing cards:", err);
        }
    };

    // Check if lobby data is available
    if (!lobby) {
        return <div>Loading...</div>;
    }

    // Function to handle the exit game button
    const handleExitGame = () => {
        // Your logic to handle exiting the game can go here
        console.log("Exiting game...");
        // For example, you can redirect to another page or reset state
        window.location.href = '/'; // Redirect to the homepage
    };

    return (
        <div className="min-h-screen bg-gray-100 relative">
            {/* Top Right Section to display Lobby Name and Code */}
            <div className="absolute top-4 right-4 flex items-center space-x-4 bg-white p-2 rounded-lg shadow-lg">
                <div className="flex flex-col items-end">
                    <span className="font-medium text-lg">Name: {lobby.name}</span>
                    <span className="text-sm text-gray-500">Code: {lobby.code}</span>
                </div>
            </div>

            {/* Left Side Card Stack */}
            <div className="absolute top-4 left-4 flex flex-col items-center space-y-4">
                <div className="text-white font-bold text-xl bg-black p-2 rounded-lg">
                    {remainingCards} Cards Left
                </div>
                
                {/* Cards with Back Facing Up */}
                <div className="flex space-x-4">
                    {backCards.map((card, index) => (
                        <div key={index} className="relative">
                            <img
                                src="https://deckofcardsapi.com/static/img/back.png"
                                alt={`Card Back ${index}`}
                                className="w-24 h-36 object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Cards with Front Facing Up */}
                <div className="flex space-x-4 mt-4">
                    {frontCards.map((card, index) => (
                        <div key={index} className="relative">
                            <img
                                src={card.image} // This is the front of the card
                                alt={`Card Front ${index}`}
                                className="w-24 h-36 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Button to draw more cards */}
            <div className="absolute bottom-4 left-4">
                <button
                    onClick={drawCards}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Draw Cards
                </button>
            </div>

            {/* Exit Game Button */}
            <div className="absolute bottom-4 right-4">
                <button
                    onClick={handleExitGame}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                >
                    Exit Game
                </button>
            </div>
        </div>
    );
}

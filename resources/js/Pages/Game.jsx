import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Game = () => {
    const { lobbyId } = useParams(); // Get lobbyId from the URL
    const [gameData, setGameData] = useState(null);

    useEffect(() => {
        // Fetch game data when the component mounts
        const fetchGameData = async () => {
            try {
                const response = await axios.post(`/api/lobbies/${lobbyId}/start`);
                setGameData(response.data); // Store the game and users data
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchGameData();
    }, [lobbyId]);

    return (
        <div>
            {gameData ? (
                <div>
                    <h2>Game Started!</h2>
                    <h3>Players:</h3>
                    <ul>
                        {gameData.users.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading game data...</p>
            )}
        </div>
    );
};

export default Game;

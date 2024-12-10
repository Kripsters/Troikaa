import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Komponente, kas attēlo katru kārti

const SinglePlayer = () => {
  const [deckId, setDeckId] = useState(null); // Kavas ID
  const [playerHand, setPlayerHand] = useState([]); // Spēlētāja roka
  const [botHand, setBotHand] = useState([]); // Botu roka
  const [boardCards, setBoardCards] = useState([]); // Kārtis uz galda
  const [moveHistory, setMoveHistory] = useState([]); // Žurnāls par spēles gājieniem
  const [remainingCards, setRemainingCards] = useState(52); // Sākotnējais kāršu skaits (52)
  const [deckImage, setDeckImage] = useState(''); // Attēls no kāršu čupas

  // Funkcija, kas iegūst jaunu kavu no API
  const getNewDeck = async () => {
    try {
      const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeckId(response.data.deck_id); // Saglabājam kavas ID
      setRemainingCards(52); // Iestata sākotnējo kāršu skaitu
    } catch (error) {
      console.error('Kļūda iegūstot kavu:', error);
    }
  };

  // Funkcija, kas sadala kārtis spēlētājam un botam
  const dealCards = async () => {
    try {
      // Iegūstam 6 kārtis spēlētājam
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`);
      setPlayerHand(response.data.cards);
      
      // Iegūstam 6 kārtis botam
      const botResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`);
      setBotHand(botResponse.data.cards);

      // Atjaunojam atlikušās kārtis
      const totalDrawn = 12; // Kopā izdalītās kārtis (6 spēlētājam + 6 botam)
      setRemainingCards(prev => prev - totalDrawn); // Atjaunojam atlikušās kārtis
    } catch (error) {
      console.error('Kļūda sadalot kārtis:', error);
    }
  };

  // Funkcija, kas iegūst virsējo kārti no čupas
  const getTopCardImage = async () => {
    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const topCard = response.data.cards[0]; // Iegūstam pirmo kārti no čupas
      setDeckImage(topCard.image); // Saglabājam kārts attēlu
      setRemainingCards(response.data.remaining); // Saglabājam atlikušās kārtis
    } catch (error) {
      console.error('Kļūda iegūstot kārti no čupas:', error);
    }
  };

  // Izmanto `useEffect`, lai ielādētu jaunu kavu pie komponentes ielādes
  useEffect(() => {
    getNewDeck();
  }, []);

  useEffect(() => {
    if (deckId) {
      dealCards(); // Sadalām kārtis pēc tam, kad kava ir ielādēta
      getTopCardImage(); // Iegūstam virsējo kārti
    }
  }, [deckId]);

  return (
    <div className="relative flex flex-col items-center justify-center space-y-4">
      {/* Botu kārtis augšā */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-4 w-full justify-center">
        {botHand.map(card => (
          <Card key={card.code} card={card} />
        ))}
      </div>

      {/* Kāršu čupa (kārtis, kas vēl nav izdalītas) */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-4 rounded-lg shadow-lg">
        <h3 className="text-center mb-2">Atlikušās Kārts</h3>
        {/* Attēls no kāršu čupas */}
        <div className="w-20 h-30 bg-blue-500 flex justify-center items-center rounded-md overflow-hidden">
          {deckImage ? (
            <img src={deckImage} alt="Top card from deck" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white">Nav kārts</span>
          )}
        </div>
        <p className="text-center text-white mt-2">{remainingCards} atlikušās kārtis</p>
      </div>

      {/* Spēlētāja kārtis apakšā */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4 w-full justify-center">
        {playerHand.map(card => (
          <Card key={card.code} card={card} />
        ))}
      </div>

      {/* Žurnāls par spēles gājieniem */}
      <div className="text-sm space-y-2 mt-4">
        {moveHistory.map((move, index) => <p key={index}>{move}</p>)}
      </div>
    </div>
  );
};

export default SinglePlayer;

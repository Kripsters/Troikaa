import React from 'react';

// `Card` komponente, kas attēlo katru kārti
const Card = ({ card, onPlay }) => {
  return (
    <div 
      className="w-20 h-30 m-2 cursor-pointer" // Samazināts izmērs un attālums starp kārtīm
      onClick={() => onPlay && onPlay(card)}
    >
      <img 
        className="w-full h-full object-cover" // Attēls aizņem visu karti un saglabā proporcijas
        src={card.image} 
        alt={`${card.value} of ${card.suit}`} 
      />
    </div>
  );
};

export default Card;

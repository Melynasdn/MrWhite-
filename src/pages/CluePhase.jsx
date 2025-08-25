import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CluePhase = () => {

  const players = useSelector(state => state.game.players);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const currentPlayer = players[currentIndex];

  const handleNext = () => {
    if (currentIndex +1 < players.length) {
      setCurrentIndex(currentIndex + 1);
    }else{
      navigate('/vote');
    }
  }

  
  return (
    <div
    className="container"
    >
      <h2> Phase des indices</h2>
      <h3>{currentPlayer.name}, c’est à toi !</h3>

      <p>Donne un indice à voix haute à propos de ton mot (sans le dire directement).</p>

      <button
        onClick={handleNext}
        style={{ marginTop: '2rem', padding: '10px 20px', fontSize: '16px' }}
      >
        {currentIndex + 1 < players.length ? ' Joueur suivant' : '🗳️ Passer au vote'}
      </button>
    </div>
  )
}

export default CluePhase

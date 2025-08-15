
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RevealWord() {
  const players = useSelector(state => state.game.players);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isIdentityRevealed, setIsIdentityRevealed] = useState(false);
  const navigate = useNavigate();

 const currentPlayer = players[currentIndex];

if (!currentPlayer) {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Erreur : Aucun joueur trouvé.</h2>
      <p>Veuillez recommencer la partie depuis la page d'accueil.</p>
    </div>
  );
}
  const handleReveal = () => {
    setIsIdentityRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < players.length) {
      setCurrentIndex(currentIndex + 1);
      setIsIdentityRevealed(false);
    } else {
      navigate('/clues');
    }
  };
  console.log('currentPlayer:', currentPlayer);

  return (
    <div 
    className="container"
    style={{ padding: '20px', textAlign: 'center' }}>
      <h2>👀 {isIdentityRevealed ? 'Voici ton mot' : `À ${currentPlayer.name} de jouer`}</h2>

      {!isIdentityRevealed ? (
        <button onClick={handleReveal} style={{ padding: '10px 20px', fontSize: '16px' }}>
          ✅ Je suis {currentPlayer.name}
        </button>
      ) : (
        <div>
          {currentPlayer.role === 'misterwhite' ? (
            <p>❓ Tu es <strong>Mister White</strong> ! Tu n’as aucun mot. Essaie de deviner !</p>
          ) : (
            <p>📝 Ton mot est : <strong>{currentPlayer.word}</strong></p>
          )}
          <button onClick={handleNext} style={{ marginTop: '20px' }}>
            🔄 Passer à la personne suivante
          </button>
        </div>
      )}
    </div>
  );
}


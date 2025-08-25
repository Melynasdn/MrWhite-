import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { resetGame } from '../redux/gameSlice';
import { useNavigate } from 'react-router-dom';
import wordPairs from '../data/wordList';
import { initializeGame } from '../redux/gameSlice';
import PopupConfirm from '../components/PopupConfirm';


const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const players = useSelector(state => state.game.players);
  const votes = useSelector(state => state.game.votes);
  const [showPopup, setShowPopup] = React.useState(false);
  const difficulty = useSelector(state => state.game.difficulty) || 'easy';


  const voteCount = {};
  votes.forEach(
    ({voted})=> {
      voteCount[voted]= (voteCount[voted] || 0) +1;
    }
  );

  let eliminated = null;
  let maxVotes = 0; 
  
    for (const name in voteCount) {
    if (voteCount[name] > maxVotes) {
      maxVotes = voteCount[name];
      eliminated = name;
    }
  }
 
  const eliminatedPlayer = players.find(p => p.name === eliminated);


  let message;
  if(!eliminatedPlayer){
    message = "Aucun joueur n'a été éliminé.";
  }else if (eliminatedPlayer.role === 'misterwhite' || eliminatedPlayer.role === 'undercover'){
     message = `Bravo  ! Vous avez éliminé le ${eliminatedPlayer.role === 'misterwhite' ? 'Mister White' : 'Undercover'} !`;
  }else{
    message = `Oh non ! Vous avez éliminé un citoyen innocent : ${eliminatedPlayer.name}.`;
  }

  const rematchWithSamePlayers = () => {
    const names = players.map(p => p.name);

    // Pioche un nouveau couple (réal/faux) selon la difficulté
    const pairList = wordPairs[difficulty];
    const randomPair = pairList[Math.floor(Math.random() * pairList.length)];

    // Redistribuer les rôles aléatoirement
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const misterWhite = shuffled.pop();
    const undercover = shuffled.pop();
    const normalPlayers = shuffled;

    const newPlayers = [
      ...normalPlayers.map(name => ({
        name,
        role: 'citizen',
        word: randomPair.real
      })),
      { name: undercover, role: 'undercover', word: randomPair.fake },
      { name: misterWhite, role: 'misterwhite', word: '' }
    ].sort(() => Math.random() - 0.5);

    // On réinitialise une nouvelle partie directement
    dispatch(initializeGame({
      players: newPlayers,
      realWord: randomPair.real,
      fakeWord: randomPair.fake,
      difficulty
    }));
       navigate('/reveal');
  };


const handleConfirm = (keepPlayers) => {
    if (keepPlayers) {
      // 💡 Ne PAS appeler resetGame ici sinon tu perds les noms.
      rematchWithSamePlayers();
    } else {
      // On repart de zéro sur Setup
      dispatch(resetGame());
      navigate('/');
    }
  };

  return (
    <div  
    className="container">
      <h2> Fin de la manche</h2>
      <h3> Joueur éliminé :  {eliminatedPlayer ? eliminatedPlayer.name : 'Aucun'} </h3>
      <h4>{message}</h4>
       <h2 style={{ marginTop: '3rem' }}>Rôles révélés</h2>
       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
        {players.map((player, i) => (
          <div key={i} style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            width: '180px',
            backgroundColor: player.role === 'misterwhite' ? '#1b2a6eff' :
                             player.role === 'undercover' ? '#16439eff' : '#162264ff'
          }}>
            <h4>{player.name}</h4>
            <p><strong>Rôle :</strong> {player.role}</p>
            <p><strong>Mot :</strong> {player.word || 'Aucun'}</p>
          </div>
        ))}
      </div>

<button
        type="button"  
        onClick={() => setShowPopup(true)}   // 👉 n'appelle plus navigate directement
        style={{
          marginTop: '3rem',
          padding: '10px 20px',
          fontSize: '16px',
          color: 'white',
          backgroundColor: '#1E88E5',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Rejouer une partie
      </button>

      {showPopup && (
        <PopupConfirm
          onClose={() => setShowPopup(false)}
          onConfirm={handleConfirm}
        />
      )}


    </div>
  )
}

export default Result

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { resetGame } from '../redux/gameSlice';
import { useNavigate } from 'react-router-dom';


const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const players = useSelector(state => state.game.players);
  const votes = useSelector(state => state.game.votes);

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

  return (
    <div  style={{ padding: '2rem', textAlign: 'center' }}>
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
            backgroundColor: player.role === 'misterwhite' ? '#ffe6e6' :
                             player.role === 'undercover' ? '#fff8dc' : '#e6f7ff'
          }}>
            <h4>{player.name}</h4>
            <p><strong>Rôle :</strong> {player.role}</p>
            <p><strong>Mot :</strong> {player.word || 'Aucun'}</p>
          </div>
        ))}
      </div>
            <button
        onClick={() => {
          dispatch(resetGame());
          navigate('/');
        }}
        style={{
          marginTop: '3rem',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        🔁 Rejouer une partie
      </button>


    </div>
  )
}

export default Result

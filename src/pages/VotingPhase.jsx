import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToVote } from '../redux/gameSlice';


const VotingPhase = () => {
  const players = useSelector(state => state.game.players);
  const [currentIndex,setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [selected, setSelected]= useState('');
/*   const [votes, setVotes] = useState([]);
 */  const dispatch = useDispatch();

  const currentPlayer = players[currentIndex];
  
  const handleVote = () => {
    if(!selected) {
      alert("Veuillez sélectionner un joueur à éliminer !");
      return;
    }

    dispatch(addToVote({ voter: currentPlayer.name, voted: selected}));

    setSelected('');

    if (currentIndex + 1 < players.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/result');
    }
  }

  const otherPlayers = players.filter(p => p.name !== currentPlayer.name);

  return (
    <div 
    className="container">
      <h2> Phase de vote</h2>
      <h3>À {currentPlayer.name} de voter</h3>

      <p>Choisis un joueur à éliminer :</p>
      {otherPlayers.map((p, i) => (
  <label 
    key={i} 
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "10px auto",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      width: "100%",
      backgroundColor: selected === p.name ? "#1b2a6e" : "#243B55",
      border: selected === p.name ? "2px solid #00c6ff" : "2px solid transparent",
      transition: "all 0.3s ease"
    }}
  >
    <input
      type="radio"
      name="vote"
      value={p.name}
      checked={selected === p.name}
      onChange={() => setSelected(p.name)}
      style={{ display: "none" }}  
    />
    <span style={{ fontSize: "18px", margin:"auto"}}>{p.name}</span>
  </label>
))}

      <button
        onClick={handleVote}
        style={{ marginTop: '2rem', padding: '10px 20px' }}
      >
         Voter
      </button>
    </div>
  )
}

export default VotingPhase

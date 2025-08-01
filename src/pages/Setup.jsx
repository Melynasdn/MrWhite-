import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import wordPairs from '../data/wordList';
import { initializeGame } from '../redux/gameSlice';


export default function Setup() {
  const [difficulty, setDifficulty]= useState('easy');
  const [playerNames, setPlayerNames]= useState(['']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (index,value)=>{
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames); 
  }
  const addPlayer = ()=>{
    setPlayerNames([...playerNames, '']);
  };

const startGame = () =>{
  const filteredNames = playerNames.filter(name => name.trim() !== '');
  if(filteredNames.length < 3){
    alert("Minimum 3 jouers !!")
    return;
  }
  const pairList = wordPairs[difficulty];
  const randomPair = pairList[Math.floor(Math.random()*pairList.length)];

  // Attribuer undercover et mister white
  const shuffled = [...filteredNames].sort(()=> Math.random()- 0.5);
  const misterWhite = shuffled.pop(); 
  const undercover = shuffled.pop(); 
  const normalPlayers = shuffled;

  const players = [
      ...normalPlayers.map(name => ({ name, role: 'citizen', word: randomPair.real })),
      { name: undercover, role: 'undercover', word: randomPair.fake },
      { name: misterWhite, role: 'misterwhite', word: '' }
    ].sort(() => Math.random() - 0.5);

  dispatch(initializeGame({
      players,
      realWord: randomPair.real,
      fakeWord: randomPair.fake,
      difficulty
    }));

  navigate('/reveal');
}

return (
    <div style={{ padding: '20px' }}>
      <h2>👥 Joueurs</h2>
      {playerNames.map((name, i) => (
        <input
          key={i}
          type="text"
          value={name}
          placeholder={`Joueur ${i + 1}`}
          onChange={e => handleNameChange(i, e.target.value)}
          style={{ display: 'block', marginBottom: '10px' }}
        />
      ))}
      <button onClick={addPlayer}>➕ Ajouter un joueur</button>

      <h3>🎯 Difficulté</h3>
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>

 <option value="easy">easy</option>
  <option value="medium">medium</option>
  <option value="hard">hard</option>
      </select>

      <br /><br />
      <button onClick={startGame}>🚀 Commencer la partie</button>
    </div>
  );
}

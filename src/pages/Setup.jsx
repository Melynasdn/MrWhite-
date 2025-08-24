import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import wordPairs from '../data/wordList';
import { initializeGame } from '../redux/gameSlice';

export default function Setup() {
  const [difficulty, setDifficulty] = useState('easy');
  const [playerNames, setPlayerNames] = useState(['']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const inputRefs = useRef([]);

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
    },
    playersInputs: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '20px',
    },
    input: {
      margin: '0 auto',
      width: '80%',
      maxWidth: '300px',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      textAlign: 'center',
    },
    select: {
      marginTop: '10px',
      padding: '10px',
      borderRadius: '6px',
      fontSize: '16px',
    },
  };

  const handleNameChange = (index, value) => {

    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const addPlayer = () => {
    setPlayerNames([...playerNames, '']);
  };

  useEffect(() => {
  if (inputRefs.current[playerNames.length - 1]) {
    inputRefs.current[playerNames.length - 1].focus();
  }
}, [playerNames.length]);


const handleKeyDown = (e, index) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const value = playerNames[index].trim().toLowerCase();

    const nameExists = playerNames.some(
      (name, i) => i !== index && name.trim().toLowerCase() === value
    );

    if (nameExists) {
      alert("Ce nom est déjà utilisé !");
      return;
    }

    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else {
      addPlayer();
    }
  }
};




  const startGame = () => {
    const filteredNames = playerNames.filter((name) => name.trim() !== '');
    if (filteredNames.length < 3) {
      alert('Minimum 3 joueurs !!');
      return;
    }
    const pairList = wordPairs[difficulty];
    const randomPair =
      pairList[Math.floor(Math.random() * pairList.length)];

    const shuffled = [...filteredNames].sort(() => Math.random() - 0.5);
    const misterWhite = shuffled.pop();
    const undercover = shuffled.pop();
    const normalPlayers = shuffled;

    const players = [
      ...normalPlayers.map((name) => ({
        name,
        role: 'citizen',
        word: randomPair.real,
      })),
      { name: undercover, role: 'undercover', word: randomPair.fake },
      { name: misterWhite, role: 'misterwhite', word: '' },
    ].sort(() => Math.random() - 0.5);

    dispatch(
      initializeGame({
        players,
        realWord: randomPair.real,
        fakeWord: randomPair.fake,
        difficulty,
      })
    );

    navigate('/reveal');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Joueurs</h2>
      <div style={styles.playersInputs}>
        {playerNames.map((name, i) => (
          <input
            key={i}
            type="text"
            value={name}
            placeholder={`Joueur ${i + 1}`}
            onChange={(e) => handleNameChange(i, e.target.value)}
            onKeyDown={(e)=> handleKeyDown(e, i)}
            ref={ (el) => (inputRefs.current[i] = el)}
            style={styles.input}

          />
        ))}
      </div>

      <button style={styles.button} onClick={addPlayer}>
        Ajouter un joueur
      </button>

      <h3 style={styles.heading}>Difficulté</h3>
      <select
        style={styles.select}
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>

      <br />
      <br />
      <button style={styles.button} onClick={startGame}>
        Commencer la partie
      </button>
      <br/>
      <button style={styles.button} onClick={() => navigate("/rules")}>
    Comment jouer ?
</button>

    </div>
  );
}

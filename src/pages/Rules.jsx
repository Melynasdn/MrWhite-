import React from "react";
import { useNavigate } from "react-router-dom";

export default function Rules() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Comment jouer à Mister White ? </h2>

      <div style={styles.textBox}>
        <p>
           Le jeu se joue à plusieurs joueurs. Chaque joueur reçoit un mot,
          mais attention :
        </p>
        <ul>
          <li>Les <b>citoyens</b> reçoivent le vrai mot.</li>
          <li>L’<b>undercover</b> reçoit un mot légèrement différent.</li>
          <li>Le <b>Mister White</b> ne reçoit aucun mot !</li>
        </ul>

        <p>
           À tour de rôle, chaque joueur doit dire un indice (un mot) pour
          décrire son mot. Mais il faut être malin :
        </p>
        <ul>
          <li>Si tu es citoyen, tu dois aider tes alliés sans être trop évident.</li>
          <li>Si tu es undercover, essaie de te fondre dans le groupe.</li>
          <li>Si tu es Mister White, invente et bluffe pour ne pas te faire démasquer.</li>
        </ul>

        <p>
           Après chaque tour, les joueurs votent pour éliminer quelqu’un. Le
          but est de découvrir les imposteurs avant qu’il ne reste plus que
          deux joueurs.
        </p>
      </div>

      <button style={styles.button} onClick={() => navigate(-1)}>
         Retour au jeu
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  textBox: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "left",
    fontSize: "16px",
    lineHeight: "1.6",
  },
};

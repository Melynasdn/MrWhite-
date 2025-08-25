import React from 'react';

const PopupConfirm = ({ onClose, onConfirm }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#243B55',
        color: 'white',
        padding: '24px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '420px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
      }}>
        <h3 style={{marginTop: 0}}>Garder la même liste de joueurs ?</h3>
        <p>Vous pouvez relancer la partie avec les mêmes noms ou revenir à l’écran de configuration.</p>

        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px'}}>
          <button
            type="button"
            onClick={() => { onConfirm(true); onClose(); }}
          >
            Oui, garder
          </button>

          <button
            type="button"
            onClick={() => { onConfirm(false); onClose(); }}
            style={{
              background: '#F44336',
              boxShadow: '0 6px #7d0505ff',
            }}
          >
            Non, changer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirm;

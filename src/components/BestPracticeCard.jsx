import React from 'react';

function BestPracticeCard({ title, description, type, isFavorite, onToggleFavorite }) {
  return (
    <div className="card" style={{border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '8px', minWidth: '250px', background: '#f9f9f9', position: 'relative'}}>
      <h2 style={{fontSize: '1.2em', marginBottom: '8px'}}>{title}</h2>
      {description && <p style={{fontSize: '1em'}}>{description}</p>}
      <span style={{fontSize: '0.9em', color: '#555', fontStyle: 'italic'}}>Type : {type}</span>
      <button
        onClick={onToggleFavorite}
        style={{position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5em'}}
        aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
}

export default BestPracticeCard;

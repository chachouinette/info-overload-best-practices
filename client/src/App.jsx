
import React from 'react';
import './App.css';
import BestPracticeList from './components/BestPracticeList';


import { useState, useEffect } from 'react';

function App() {
  const [myPractices, setMyPractices] = useState([]);
  const [adoptedPractices, setAdoptedPractices] = useState([]);
  const [bestPractices, setBestPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/best-practices')
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des données');
        return res.json();
      })
      .then(data => {
        setBestPractices(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Ajoute ou retire une pratique de la sélection (max 3)
  const togglePractice = idx => {
    setMyPractices(practices => {
      if (practices.includes(idx)) {
        return practices.filter(i => i !== idx);
      } else if (practices.length < 3) {
        return [...practices, idx];
      } else {
        return practices;
      }
    });
  };

  // Déplacer une pratique adoptée
  const adoptPractice = idx => {
    setAdoptedPractices(prev => prev.includes(idx) ? prev : [...prev, idx]);
    setMyPractices(prev => prev.filter(i => i !== idx));
  };
  const removeAdopted = idx => {
    setAdoptedPractices(prev => prev.filter(i => i !== idx));
  };

  if (loading) {
    return <div>Chargement des bonnes pratiques...</div>;
  }
  if (error) {
    return <div style={{color: 'red'}}>Erreur : {error}</div>;
  }
  return (
    <div>
      <h1>Bonnes pratiques contre l'infobésité</h1>
      {/* Encart flex */}
      <div style={{
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: '18px 0',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {/* Mes 3 pratiques à mettre en place */}
        <div style={{
          background: '#e3eaf3',
          border: '2px solid #003366',
          borderRadius: '12px',
          padding: '18px',
          minWidth: 340,
          flex: '1 1 340px',
          boxShadow: '0 2px 8px rgba(0,51,102,0.07)'
        }}>
          <h2 style={{color: '#003366', marginTop: 0}}>📝 Mes 3 pratiques à mettre en place</h2>
          {myPractices.length === 0 ? (
            <div style={{color: '#666', fontStyle: 'italic'}}>Sélectionnez jusqu'à 3 pratiques à retenir dans la liste ci-dessous.</div>
          ) : (
            <ol style={{paddingLeft: 20}}>
              {myPractices.map(idx => (
                <li key={idx} style={{marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>{bestPractices[idx]?.description || ''}</span>
                  <span>
                    <button onClick={() => adoptPractice(idx)} style={{marginLeft: 8, fontSize: '0.9em', color: '#008000', background: 'none', border: 'none', cursor: 'pointer'}} title="Adopter">✔️</button>
                    <button onClick={() => togglePractice(idx)} style={{marginLeft: 4, fontSize: '0.9em', color: '#003366', background: 'none', border: 'none', cursor: 'pointer'}} title="Retirer">✕</button>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
        {/* Mes pratiques adoptées */}
        <div style={{
          background: '#e3f3e8',
          border: '2px solid #008000',
          borderRadius: '12px',
          padding: '18px',
          minWidth: 340,
          flex: '1 1 340px',
          boxShadow: '0 2px 8px rgba(0,128,0,0.07)'
        }}>
          <h2 style={{color: '#008000', marginTop: 0}}>🌱 Mes pratiques adoptées</h2>
          {adoptedPractices.length === 0 ? (
            <div style={{color: '#666', fontStyle: 'italic'}}>Aucune pratique adoptée pour le moment.</div>
          ) : (
            <ol style={{paddingLeft: 20}}>
              {adoptedPractices.map(idx => (
                <li key={idx} style={{marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>{bestPractices[idx]?.description || ''}</span>
                  <button onClick={() => removeAdopted(idx)} style={{marginLeft: 8, fontSize: '0.9em', color: '#008000', background: 'none', border: 'none', cursor: 'pointer'}} title="Retirer">✕</button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
      <BestPracticeList onSelectPractice={togglePractice} selectedPractices={myPractices} bestPractices={bestPractices} />
    </div>
  );
}

export default App;

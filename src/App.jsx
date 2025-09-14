
import React from 'react';
import './App.css';
import BestPracticeList from './components/BestPracticeList';
import bestPracticesData from './data/bestPractices';


import { useState, useEffect } from 'react';

function App() {
  const [myPractices, setMyPractices] = useState(() => {
    const saved = localStorage.getItem('myPractices');
    return saved ? JSON.parse(saved) : [];
  });
  const [adoptedPractices, setAdoptedPractices] = useState(() => {
    const saved = localStorage.getItem('adoptedPractices');
    return saved ? JSON.parse(saved) : [];
  });
  const [bestPractices, setBestPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
        setBestPractices(bestPracticesData);
        setLoading(false);
  }, []);

  // Ajoute ou retire une pratique de la sélection (max 3)
  const togglePractice = id => {
    setMyPractices(practices => {
      let updated;
      if (practices.includes(id)) {
        updated = practices.filter(i => i !== id);
      } else if (practices.length < 3) {
        updated = [...practices, id];
      } else {
        updated = practices;
      }
      localStorage.setItem('myPractices', JSON.stringify(updated));
      return updated;
    });
  };

  // Déplacer une pratique adoptée
  const adoptPractice = id => {
    setAdoptedPractices(prev => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem('adoptedPractices', JSON.stringify(updated));
      return updated;
    });
    setMyPractices(prev => {
      const updated = prev.filter(i => i !== id);
      localStorage.setItem('myPractices', JSON.stringify(updated));
      return updated;
    });
  };
  const removeAdopted = id => {
    setAdoptedPractices(prev => {
      const updated = prev.filter(i => i !== id);
      localStorage.setItem('adoptedPractices', JSON.stringify(updated));
      return updated;
    });
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
          <h2 style={{color: '#003366', marginTop: 0}}>📝 Mes 3 pratiques à adopter</h2>
          {myPractices.length === 0 ? (
            <div style={{color: '#666', fontStyle: 'italic'}}>Sélectionnez jusqu'à 3 pratiques à retenir dans la liste ci-dessous.</div>
          ) : (
            <ol style={{paddingLeft: 20}}>
              {myPractices.map(id => {
                const practice = bestPractices.find(p => p.id === id);
                if (!practice) return null;
                return (
                  <li key={id} style={{
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{flex: 1}}>{practice.description || ''}</span>
                    <span style={{display: 'flex', gap: 8, marginLeft: 'auto'}}>
                      <button onClick={() => adoptPractice(id)} style={{fontSize: '0.9em', color: '#008000', background: 'none', border: 'none', cursor: 'pointer'}} title="Adopter">✔️</button>
                      <button onClick={() => togglePractice(id)} style={{fontSize: '0.9em', color: '#003366', background: 'none', border: 'none', cursor: 'pointer'}} title="Retirer">✕</button>
                    </span>
                  </li>
                );
              })}
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
              {adoptedPractices.map(id => {
                const practice = bestPractices.find(p => p.id === id);
                if (!practice) return null;
                return (
                  <li key={id} style={{marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>{practice.description || ''}</span>
                    <button onClick={() => removeAdopted(id)} style={{marginLeft: 8, fontSize: '0.9em', color: '#008000', background: 'none', border: 'none', cursor: 'pointer'}} title="Retirer">✕</button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
      <BestPracticeList
        onSelectPractice={togglePractice}
        selectedPractices={myPractices}
        bestPractices={bestPractices}
        adoptPractice={adoptPractice}
        adoptedPractices={adoptedPractices}
        maxSelected={3}
      />
    </div>
  );
}

export default App;

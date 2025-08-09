

import React, { useState, useEffect } from 'react';
import { bestPractices } from '../data/bestPractices';


function BestPracticeList({ onSelectPractice, selectedPractices }) {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = sessionStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const types = Array.from(new Set(bestPractices.map(p => p.type)));

  // Filtrage par type puis recherche textuelle
  const filteredPractices = bestPractices.filter(p => {
    const matchesType = filter ? p.type === filter : true;
    const matchesSearch = search
      ? (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      : true;
    return matchesType && matchesSearch;
  });

  const displayPractices = showOnlyFavorites
    ? filteredPractices.filter((_, idx) => favorites.includes(idx))
    : filteredPractices;

  useEffect(() => {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Pagination
  const totalPages = Math.ceil(displayPractices.length / pageSize);
  const paginatedPractices = displayPractices.slice((page - 1) * pageSize, page * pageSize);

  const handleToggleFavorite = idx => {
    setFavorites(favs =>
      favs.includes(idx) ? favs.filter(i => i !== idx) : [...favs, idx]
    );
  };

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [filter, showOnlyFavorites]);

  return (
    <div>
      <div style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap'}}>
        <div>
          <label htmlFor="type-filter">Filtrer par type : </label>
          <select id="type-filter" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">Tous</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="search-bar" style={{marginRight: '6px'}}>Recherche : </label>
          <input
            id="search-bar"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une pratique..."
            style={{padding: '8px', borderRadius: '6px', border: '1px solid #ccc', minWidth: '200px'}}
          />
        </div>
        <button onClick={() => setShowOnlyFavorites(fav => !fav)} style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', background: showOnlyFavorites ? '#ffe066' : '#f9f9f9', cursor: 'pointer'}}>
          {showOnlyFavorites ? 'Afficher tout' : 'Afficher les favoris'}
        </button>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '900px', margin: '0 auto'}}>
        {paginatedPractices.length === 0 ? (
          <div style={{color: '#888', fontStyle: 'italic', gridColumn: '1 / -1'}}>Aucune carte à afficher.</div>
        ) : (
          paginatedPractices.map((practice, idx) => {
            const globalIdx = (page - 1) * pageSize + idx;
            const isSelected = selectedPractices && selectedPractices.includes(globalIdx);
            return (
              <div key={globalIdx} style={{border: '1px solid #ccc', borderRadius: '8px', background: isSelected ? '#ffe066' : '#f9f9f9', padding: '16px', position: 'relative'}}>
                <h2 style={{fontSize: '1.1em', marginBottom: '8px'}}>{practice.title}</h2>
                {practice.description && <p style={{fontSize: '1em'}}>{practice.description}</p>}
                <button
                  className="favorite-btn"
                  onClick={() => handleToggleFavorite(globalIdx)}
                  aria-label={favorites.includes(globalIdx) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  {favorites.includes(globalIdx) ? '★' : '☆'}
                </button>
                <span style={{fontSize: '0.9em', color: '#555', fontStyle: 'italic', marginTop: 8, display: 'block'}}>{practice.type}</span>
                {onSelectPractice && (
                  <button
                    onClick={() => onSelectPractice(globalIdx)}
                    style={{position: 'absolute', bottom: 36, right: 8, background: isSelected ? '#003366' : '#e3eaf3', color: isSelected ? '#fff' : '#003366', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '0.95em', cursor: 'pointer'}}
                    aria-label={isSelected ? 'Retirer de mes pratiques' : 'Ajouter à mes pratiques'}
                    disabled={selectedPractices && selectedPractices.length >= 3 && !isSelected}
                  >
                    {isSelected ? 'Retirer' : 'Ajouter'}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
      {totalPages > 1 && (
        <div style={{display: 'flex', justifyContent: 'center', margin: '16px 0', gap: '8px'}}>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', background: '#f9f9f9', cursor: page === 1 ? 'not-allowed' : 'pointer'}}>
            Précédent
          </button>
          <span style={{alignSelf: 'center'}}>Page {page} / {totalPages}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', background: '#f9f9f9', cursor: page === totalPages ? 'not-allowed' : 'pointer'}}>
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}

export default BestPracticeList;

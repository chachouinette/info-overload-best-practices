import React, { useState, useEffect } from 'react';



function BestPracticeList({ onSelectPractice, selectedPractices, bestPractices = [], adoptPractice, adoptedPractices = [], maxSelected = 3 }) {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
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
    localStorage.setItem('favorites', JSON.stringify(favorites));
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
      <div style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center'}}>
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
            const isFavorite = favorites.includes(globalIdx);
            const isSelected = selectedPractices && selectedPractices.includes(globalIdx);
            const isAdopted = adoptedPractices.includes(globalIdx);
            return (
              <div
                key={globalIdx}
                style={{
                  border: isFavorite ? '2px solid #ffcc00' : '1px solid #ccc',
                  borderRadius: '8px',
                  background: isSelected ? '#ffe066' : isFavorite ? '#fff8e1' : '#f9f9f9',
                  padding: '16px',
                  position: 'relative',
                }}
              >
                <h2 style={{fontSize: '1.1em', marginBottom: '8px'}}>{practice.title}</h2>
                {practice.description && <p style={{fontSize: '1em'}}>{practice.description}</p>}
                <span
                  className="favorite-star"
                  onClick={() => handleToggleFavorite(globalIdx)}
                  aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.5em',
                    color: isFavorite ? '#ffcc00' : '#ccc',
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                >
                  {isFavorite ? '★' : '☆'}
                </span>
                <span style={{fontSize: '0.9em', color: '#555', fontStyle: 'italic', marginTop: 8, display: 'block'}}>{practice.type}</span>
                <div style={{marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                  {/* Ajouter à mes 3 pratiques */}
                  <button
                    onClick={() => onSelectPractice(globalIdx)}
                    disabled={isSelected || selectedPractices.length >= maxSelected || isAdopted}
                    style={{
                      background: isSelected ? '#003366' : '#e3eaf3',
                      color: isSelected ? '#fff' : '#003366',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.95em',
                      cursor: isSelected || selectedPractices.length >= maxSelected || isAdopted ? 'not-allowed' : 'pointer',
                      opacity: isSelected || selectedPractices.length >= maxSelected || isAdopted ? 0.6 : 1,
                    }}
                    aria-label={isSelected ? 'Déjà dans mes pratiques' : 'Ajouter à mes pratiques'}
                  >
                    {isSelected ? 'Dans mes 3 pratiques' : isAdopted ? 'Déjà adoptée' : 'Ajouter à mes 3 pratiques'}
                  </button>
                  {/* Adopter */}
                  <button
                    onClick={() => adoptPractice(globalIdx)}
                    disabled={isAdopted}
                    style={{
                      background: isAdopted ? '#008000' : '#e3f3e8',
                      color: isAdopted ? '#fff' : '#008000',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.95em',
                      cursor: isAdopted ? 'not-allowed' : 'pointer',
                      opacity: isAdopted ? 0.6 : 1,
                    }}
                    aria-label={isAdopted ? 'Déjà adoptée' : 'Adopter'}
                  >
                    {isAdopted ? 'Déjà adoptée' : 'Adopter'}
                  </button>
                </div>
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

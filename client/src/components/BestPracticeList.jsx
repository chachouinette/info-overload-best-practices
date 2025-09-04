// Icônes SVG par type de bonne pratique
const typeIcons = {
  "Gestion des emails": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#e3eaf3"/><path d="M4 7l8 5 8-5" stroke="#003366" strokeWidth="2" fill="none"/><rect x="4" y="7" width="16" height="10" rx="2" stroke="#003366" strokeWidth="2" fill="none"/></svg>
  ),
  "Réactivité et déconnexion": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#003366" strokeWidth="2" fill="#ffe066"/><path d="M12 6v6l4 2" stroke="#003366" strokeWidth="2" fill="none"/></svg>
  ),
  "Congés numériques": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#e3f3e8"/><path d="M4 18l8-12 8 12" stroke="#008000" strokeWidth="2" fill="none"/></svg>
  ),
  "Communication multi-canaux": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#f9f9f9"/><ellipse cx="12" cy="12" rx="8" ry="5" stroke="#003366" strokeWidth="2" fill="none"/><ellipse cx="12" cy="12" rx="4" ry="2.5" stroke="#003366" strokeWidth="2" fill="none"/></svg>
  ),
  "Tchat et messagerie instantanée": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#fff8e1"/><rect x="5" y="7" width="14" height="8" rx="2" stroke="#ffcc00" strokeWidth="2" fill="none"/><circle cx="8" cy="11" r="1" fill="#ffcc00"/><circle cx="12" cy="11" r="1" fill="#ffcc00"/><circle cx="16" cy="11" r="1" fill="#ffcc00"/></svg>
  ),
  "Travail collaboratif sur fichiers": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#e3eaf3"/><rect x="6" y="7" width="12" height="10" rx="2" stroke="#003366" strokeWidth="2" fill="none"/><path d="M10 11h4" stroke="#003366" strokeWidth="2"/></svg>
  ),
  "Réunions : Concentration et disponibilité": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#008000" strokeWidth="2" fill="#e3f3e8"/><path d="M8 12h8" stroke="#008000" strokeWidth="2"/></svg>
  ),
  "Organisation des réunions": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#ffe066"/><rect x="6" y="7" width="12" height="10" rx="2" stroke="#003366" strokeWidth="2" fill="none"/><path d="M9 11h6" stroke="#003366" strokeWidth="2"/></svg>
  ),
  "Lutte contre le multi-tâches": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#f9f9f9"/><path d="M6 12h12" stroke="#003366" strokeWidth="2"/><path d="M12 6v12" stroke="#003366" strokeWidth="2"/></svg>
  ),
  "Management et exemplarité": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#003366" strokeWidth="2" fill="#e3eaf3"/><rect x="6" y="14" width="12" height="6" rx="3" stroke="#003366" strokeWidth="2" fill="#e3eaf3"/></svg>
  ),
  "Pratiques vis-à-vis de l'environnement personnel": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#e3f3e8"/><path d="M6 18V8l6-4 6 4v10" stroke="#008000" strokeWidth="2" fill="none"/></svg>
  ),
};
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
    ? filteredPractices.filter(p => favorites.includes(p.id))
    : filteredPractices;

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Pagination
  const totalPages = Math.ceil(displayPractices.length / pageSize);
  const paginatedPractices = displayPractices.slice((page - 1) * pageSize, page * pageSize);

  const handleToggleFavorite = id => {
    setFavorites(favs =>
      favs.includes(id) ? favs.filter(i => i !== id) : [...favs, id]
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
          paginatedPractices.map((practice) => {
            const id = practice.id;
            const isFavorite = favorites.includes(id);
            const isSelected = selectedPractices && selectedPractices.includes(id);
            const isAdopted = adoptedPractices.includes(id);
            return (
              <div
                key={id}
                style={{
                  border: isFavorite ? '2px solid #ffcc00' : '1px solid #ccc',
                  borderRadius: '8px',
                  background: isSelected ? '#ffe066' : isFavorite ? '#fff8e1' : '#f9f9f9',
                  padding: '16px',
                  position: 'relative',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <span>{typeIcons[practice.type] || null}</span>
                  <h2 style={{fontSize: '1.1em', margin: 0}}>{practice.title}</h2>
                </div>
                {practice.description && <p style={{fontSize: '1em'}}>{practice.description}</p>}
                <span
                  className="favorite-star"
                  onClick={() => handleToggleFavorite(id)}
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
                    onClick={() => onSelectPractice(id)}
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
                    onClick={() => adoptPractice(id)}
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

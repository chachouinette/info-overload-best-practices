// Icônes images par type de bonne pratique
const typeIcons = {
  "Gestion des emails": "/icons/gestionEmails.png",
  "Réactivité et déconnexion": "/icons/reactivite.png",
  "Congés numériques": "/icons/deconnexion.png",
  "Communication multi-canaux": "/icons/commMultiCanaux.png",
  "Tchat et messagerie instantanée": "/icons/messInstantanee.png",
  "Travail collaboratif sur fichiers": "/icons/travailco_fichiers.png",
  "Réunions : Concentration et disponibilité": "/icons/concentration&dispo.png",
  "Organisation des réunions": "/icons/orgaReu.png",
  "Lutte contre le multi-tâches": "/icons/multiTaches.png",
  "Management et exemplarité": "/icons/management.png",
  "Pratiques vis-à-vis de l'environnement personnel": "/icons/envPerso.png",
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
                    // fontWeight supprimé pour éviter le gras
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
                  border: isFavorite ? '2px solid #2196f3' : '1px solid #e0e0e0',
                  borderRadius: '12px',
                  background: isSelected ? '#e3f2fd' : isFavorite ? '#f5faff' : '#fff',
                  color: isSelected ? '#1565c0' : '#222',
                  boxShadow: '0 2px 8px rgba(33, 150, 243, 0.07)',
                  padding: '16px',
                  position: 'relative',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  {typeIcons[practice.type] && (
                    <img src={typeIcons[practice.type]} alt={practice.type} style={{ width: 28, height: 28, objectFit: 'contain', marginRight: 4 }} />
                  )}
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
                    color: isFavorite ? '#0057b8' : '#888',
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    textShadow: '0 1px 2px #fff',
                  }}
                >
                  {isFavorite ? '★' : '☆'}
                </span>
                  <span style={{
                    fontSize: '0.85em',
                    color: isSelected ? '#1565c0' : '#444',
                    fontStyle: 'italic',
                    marginTop: 8,
                    display: 'block',
                    marginBottom: '32px',
                    textShadow: isSelected ? '0 1px 2px #e3f2fd' : 'none',
                    letterSpacing: '0.01em',
                  }}>{practice.type}</span>
                <div style={{
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  right: 16,
                  bottom: 16,
                  zIndex: 2,
                }}>
                  {/* Ajouter à mes 3 pratiques */}
                  <button
                    onClick={() => onSelectPractice(id)}
                    disabled={isSelected || selectedPractices.length >= maxSelected || isAdopted}
                    style={{
                      background: isSelected ? '#2196f3' : '#f5faff',
                      color: isSelected ? '#fff' : '#1565c0',
                      fontWeight: 'normal',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.85em',
                      cursor: isSelected || selectedPractices.length >= maxSelected || isAdopted ? 'not-allowed' : 'pointer',
                      opacity: isSelected || selectedPractices.length >= maxSelected || isAdopted ? 0.6 : 1,
                      fontWeight: 'bold',
                    }}
                    aria-label={isSelected ? 'Déjà dans mes pratiques' : 'Ajouter à mes pratiques'}
                  >
                    {isSelected ? 'Dans mes 3 pratiques' : isAdopted ? 'Déjà adoptée' : 'À adopter'}
                  </button>
                  {/* Adopter */}
                  <button
                    onClick={() => adoptPractice(id)}
                    disabled={isAdopted}
                    style={{
                      background: isAdopted ? '#1565c0' : '#f5faff',
                      color: isAdopted ? '#fff' : '#1565c0',
                      fontWeight: 'normal',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.85em',
                      cursor: isAdopted ? 'not-allowed' : 'pointer',
                      opacity: isAdopted ? 0.6 : 1,
                      fontWeight: 'bold',
                    }}
                    aria-label={isAdopted ? 'Déjà adoptée' : 'Adopter'}
                  >
                    {isAdopted ? 'Adoptée' : 'Adoptée'}
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

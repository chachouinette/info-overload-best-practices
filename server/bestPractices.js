const bestPractices = [
  // Gestion des emails
  { id: 1, type: "Gestion des emails", description: "Lister collectivement les emails irritants et les informations inutiles pour les supprimer" },
  { id: 2, type: "Gestion des emails", description: "Faire de l'urgence l'exception et clarifier sa notion : objet, canal, délai" },
  { id: 3, type: "Gestion des emails", description: "Différencier et expliciter les destinataires pour action et pour information" },
  { id: 4, type: "Gestion des emails", description: "Clarifier l'intention de la mise en copie (pour information, pour traçabilité, pour appui)" },
  { id: 5, type: "Gestion des emails", description: "Limiter le nombre de niveaux hiérarchiques dans une même boucle d'emails" },
  { id: 6, type: "Gestion des emails", description: "Faire du 'répondre à l'émetteur' par défaut plutôt que du 'répondre à tous'" },
  { id: 7, type: "Gestion des emails", description: "Partir du principe qu'il vaut mieux 5 emails envoyés avec 1 destinataire qu'1 email envoyé à 5 destinataires" },
  { id: 8, type: "Gestion des emails", description: "Éviter l'usage de l'email pour une diffusion à plus de 10 personnes" },
  { id: 9, type: "Gestion des emails", description: "Limiter les conversations par emails avec plus de 5 personnes dans la boucle" },
  { id: 10, type: "Gestion des emails", description: "Mettre en place des règles pour filtrer et prioriser les emails" },
  { id: 11, type: "Gestion des emails", description: "Clarifier dans les objets : niveau d'importance, délai de réponse, actions attendues" },

  // Réactivité et déconnexion
  { id: 12, type: "Réactivité et déconnexion", description: "Définir collectivement des plages d'échanges synchrones (forte réactivité attendue) ou asynchrones" },
  { id: 13, type: "Réactivité et déconnexion", description: "Mieux gérer et afficher sa disponibilité (en réglant ses notifications en fonction)" },
  { id: 14, type: "Réactivité et déconnexion", description: "Clarifier en équipe le canal de l'urgence pour supprimer le besoin de consultation des emails par peur de rater l'urgence" },
  { id: 15, type: "Réactivité et déconnexion", description: "Inventer un rituel de fin de journée numérique" },
  { id: 16, type: "Réactivité et déconnexion", description: "Utiliser les fonctionnalités d'envoi différé et mesurer leur utilisation réelle" },
  { id: 17, type: "Réactivité et déconnexion", description: "Travailler sur la consultation séquentielle des boîtes aux lettres" },
  { id: 18, type: "Réactivité et déconnexion", description: "Désactiver ses notifications" },
  { id: 19, type: "Réactivité et déconnexion", description: "Ne pas consulter ses messages sur le temps personnel" },

  // Congés numériques
  { id: 20, type: "Droit à la déconnexion", description: "Prévoir dans son agenda un créneau de décollage pour préparer son départ en congés, et d'atterrissage au retour" },
  { id: 21, type: "Droit à la déconnexion", description: "Partager sa stratégie de déconnexion dans sa signature d'email pour en informer ses destinataires" },

  // Communication multi-canaux
  { id: 22, type: "Communication multi-canaux", description: "Définir une charte dans son équipe, qui précise pour chaque canal : le type d'informations partagées, le ton utilisé, les horaires, le délai de réponse attendu, le caractère synchrone ou non des échanges" },
  { id: 23, type: "Communication multi-canaux", description: "Limiter le mille-feuille communicationnel pour ne pas surcharger cognitivement les collègues" },
  { id: 24, type: "Communication multi-canaux", description: "Décrocher son téléphone au-delà de 3 emails (en one-to-one)" },

  // Tchat et messagerie instantanée
  { id: 25, type: "Messagerie instantanée", description: "Adopter le tchat comme un canal de 'flux' : ne pas y stocker des éléments indispensables d'un projet au long terme" },
  { id: 26, type: "Messagerie instantanée", description: "Définir des plages de disponibilités pour éviter les interruptions permanentes" },

  // Travail collaboratif sur fichiers
  { id: 27, type: "Travail collaboratif sur fichiers", description: "Travailler sur fichier collaboratif (pour éviter le versionning)" },
  { id: 28, type: "Travail collaboratif sur fichiers", description: "Développer l'utilisation d'outils collaboratifs pour les projets les plus complexes" },
  { id: 29, type: "Travail collaboratif sur fichiers", description: "Former à partir de cas d'usage (plutôt que sur l'outil lui-même)" },
  { id: 30, type: "Travail collaboratif sur fichiers", description: "Se former en équipe à la chaîne collaborative avec la nécessité d'embarquer tout le monde" },
  { id: 31, type: "Travail collaboratif sur fichiers", description: "Créer des binômes de mentoring pour assurer du soutien à celles et ceux qui sont moins à l'aise" },
  { id: 32, type: "Travail collaboratif sur fichiers", description: "Piloter l'adoption des nouveaux outils de communication" },
  { id: 33, type: "Travail collaboratif sur fichiers", description: "Partager un lien plutôt qu'un fichier" },
  { id: 34, type: "Travail collaboratif sur fichiers", description: "Compresser les fichiers/les pièces jointes" },

  // Réunions : Concentration et disponibilité
  { id: 35, type: "Concentration et disponibilité", description: "Bloquer des plages protégées de travail dans son agenda et les rendre visibles" },
  { id: 36, type: "Concentration et disponibilité", description: "Mettre en place une routine de gestion des emails avec des créneaux dédiés" },
  { id: 37, type: "Concentration et disponibilité", description: "Réduire le volume de réunions pour libérer un temps suffisant de traitement de l'information" },
  { id: 38, type: "Concentration et disponibilité", description: "Mettre son mobile en mode silencieux" },
  { id: 39, type: "Concentration et disponibilité", description: "Éteindre sa fenêtre Internet et son téléphone" },
  { id: 40, type: "Concentration et disponibilité", description: "Sacraliser la pause déjeuner" },

  // Organisation des réunions
  { id: 41, type: "Organisation des réunions", description: "Mettre en place un délai minimal de prévenance pour organiser une réunion" },
  { id: 42, type: "Organisation des réunions", description: "Clarifier la contribution attendue des participant·es" },
  { id: 43, type: "Organisation des réunions", description: "Clarifier l'objectif de chaque réunion en indiquant dans l'objet : Information / Réflexion / Décision" },
  { id: 44, type: "Organisation des réunions", description: "Séquencer les réunions longues en ciblant les audiences" },
  { id: 45, type: "Organisation des réunions", description: "Changer la durée par défaut des réunions" },
  { id: 46, type: "Organisation des réunions", description: "Accepter de refuser des invitations aux réunions mal ciblées" },
  { id: 47, type: "Organisation des réunions", description: "S'imposer une réponse définitive 48h avant pour permettre à l'organisateur de mieux préparer sa réunion" },
  { id: 48, type: "Organisation des réunions", description: "Utiliser la méthode ROTI (Return On Time Invested)" },

  // Lutte contre le multi-tâches
  { id: 49, type: "Lutter contre le multi-tâches", description: "Prévoir des 'pauses emails' pendant les réunions toutes les 90 minutes" },
  { id: 50, type: "Lutter contre le multi-tâches", description: "Formaliser un 'contrat de concentration' avec ses collègues : des réunions plus courtes en échange d'une interdiction d'utiliser les ordinateurs et smartphones" },
  { id: 51, type: "Lutter contre le multi-tâches", description: "Stimuler l'engagement des collègues : plus d'interactions, moins de personnes, plus court" },
  { id: 52, type: "Lutter contre le multi-tâches", description: "Déposer son téléphone en début de réunion dans une boîte collective" },

  // Management et exemplarité
  { id: 53, type: "Management et exemplarité", description: "Mettre en place de la reconnaissance managériale autrement que par email" },
  { id: 54, type: "Management et exemplarité", description: "Fixer un temps maximal hebdomadaire alloué aux réunions dans son planificateur" },
  { id: 55, type: "Management et exemplarité", description: "Respecter la disponibilité des autres" },
  { id: 56, type: "Management et exemplarité", description: "Expérimenter les applications de blocage d'app, pour lutter contre les réflexes de consultation" },
  { id: 57, type: "Management et exemplarité", description: "Développer l'exemplarité numérique des dirigeant·es" },
  { id: 58, type: "Management et exemplarité", description: "Adopter de bonnes pratiques pour soutenir activement les collaborateurs" },

  // Pratiques vis-à-vis de l'environnement personnel
  { id: 59, type: "Environnement personnel", description: "Séparer le téléphone professionnel du personnel" },
  { id: 60, type: "Environnement personnel", description: "Négocier avec son entourage pour ne pas être dérangé pendant le temps de travail" },
  { id: 61, type: "Environnement personnel", description: "Ne pas répondre aux sollicitations personnelles sur le temps de travail (sauf urgences)" },
];

module.exports = { bestPractices };

const bestPractices = [
  // Gestion des emails
  { type: "Gestion des emails", description: "Lister collectivement les emails irritants et les informations inutiles pour les supprimer" },
  { type: "Gestion des emails", description: "Faire de l'urgence l'exception et clarifier sa notion : objet, canal, délai" },
  { type: "Gestion des emails", description: "Différencier et expliciter les destinataires pour action et pour information" },
  { type: "Gestion des emails", description: "Clarifier l'intention de la mise en copie (pour information, pour traçabilité, pour appui)" },
  { type: "Gestion des emails", description: "Limiter le nombre de niveaux hiérarchiques dans une même boucle d'emails" },
  { type: "Gestion des emails", description: "Faire du 'répondre à l'émetteur' par défaut plutôt que du 'répondre à tous'" },
  { type: "Gestion des emails", description: "Partir du principe qu'il vaut mieux 5 emails envoyés avec 1 destinataire qu'1 email envoyé à 5 destinataires" },
  { type: "Gestion des emails", description: "Éviter l'usage de l'email pour une diffusion à plus de 10 personnes" },
  { type: "Gestion des emails", description: "Limiter les conversations par emails avec plus de 5 personnes dans la boucle" },
  { type: "Gestion des emails", description: "Mettre en place des règles pour filtrer et prioriser les emails" },
  { type: "Gestion des emails", description: "Clarifier dans les objets : niveau d'importance, délai de réponse, actions attendues" },

  // Réactivité et déconnexion
  { type: "Réactivité et déconnexion", description: "Définir collectivement des plages d'échanges synchrones (forte réactivité attendue) ou asynchrones" },
  { type: "Réactivité et déconnexion", description: "Mieux gérer et afficher sa disponibilité (en réglant ses notifications en fonction)" },
  { type: "Réactivité et déconnexion", description: "Clarifier en équipe le canal de l'urgence pour supprimer le besoin de consultation des emails par peur de rater l'urgence" },
  { type: "Réactivité et déconnexion", description: "Inventer un rituel de fin de journée numérique" },
  { type: "Réactivité et déconnexion", description: "Utiliser les fonctionnalités d'envoi différé et mesurer leur utilisation réelle" },
  { type: "Réactivité et déconnexion", description: "Travailler sur la consultation séquentielle des boîtes aux lettres" },
  { type: "Réactivité et déconnexion", description: "Désactiver ses notifications" },
  { type: "Réactivité et déconnexion", description: "Ne pas consulter ses messages sur le temps personnel" },

  // Congés numériques
  { type: "Congés numériques", description: "Prévoir dans son agenda un créneau de décollage pour préparer son départ en congés, et d'atterrissage au retour" },
  { type: "Congés numériques", description: "Partager sa stratégie de déconnexion dans sa signature d'email pour en informer ses destinataires" },

  // Communication multi-canaux
  { type: "Communication multi-canaux", description: "Définir une charte dans son équipe, qui précise pour chaque canal : le type d'informations partagées, le ton utilisé, les horaires, le délai de réponse attendu, le caractère synchrone ou non des échanges" },
  { type: "Communication multi-canaux", description: "Limiter le mille-feuille communicationnel pour ne pas surcharger cognitivement les collègues" },
  { type: "Communication multi-canaux", description: "Décrocher son téléphone au-delà de 3 emails (en one-to-one)" },

  // Tchat et messagerie instantanée
  { type: "Tchat et messagerie instantanée", description: "Adopter le tchat comme un canal de 'flux' : ne pas y stocker des éléments indispensables d'un projet au long terme" },
  { type: "Tchat et messagerie instantanée", description: "Définir des plages de disponibilités pour éviter les interruptions permanentes" },

  // Travail collaboratif sur fichiers
  { type: "Travail collaboratif sur fichiers", description: "Travailler sur fichier collaboratif (pour éviter le versionning)" },
  { type: "Travail collaboratif sur fichiers", description: "Développer l'utilisation d'outils collaboratifs pour les projets les plus complexes" },
  { type: "Travail collaboratif sur fichiers", description: "Former à partir de cas d'usage (plutôt que sur l'outil lui-même)" },
  { type: "Travail collaboratif sur fichiers", description: "Se former en équipe à la chaîne collaborative avec la nécessité d'embarquer tout le monde" },
  { type: "Travail collaboratif sur fichiers", description: "Créer des binômes de mentoring pour assurer du soutien à celles et ceux qui sont moins à l'aise" },
  { type: "Travail collaboratif sur fichiers", description: "Piloter l'adoption des nouveaux outils de communication" },
  { type: "Travail collaboratif sur fichiers", description: "Partager un lien plutôt qu'un fichier" },
  { type: "Travail collaboratif sur fichiers", description: "Compresser les fichiers/les pièces jointes" },

  // Réunions : Concentration et disponibilité
  { type: "Réunions : Concentration et disponibilité", description: "Bloquer des plages protégées de travail dans son agenda et les rendre visibles" },
  { type: "Réunions : Concentration et disponibilité", description: "Mettre en place une routine de gestion des emails avec des créneaux dédiés" },
  { type: "Réunions : Concentration et disponibilité", description: "Réduire le volume de réunions pour libérer un temps suffisant de traitement de l'information" },
  { type: "Réunions : Concentration et disponibilité", description: "Mettre son mobile en mode silencieux" },
  { type: "Réunions : Concentration et disponibilité", description: "Éteindre sa fenêtre Internet et son téléphone" },
  { type: "Réunions : Concentration et disponibilité", description: "Sacraliser la pause déjeuner" },

  // Organisation des réunions
  { type: "Organisation des réunions", description: "Mettre en place un délai minimal de prévenance pour organiser une réunion" },
  { type: "Organisation des réunions", description: "Clarifier la contribution attendue des participant·es" },
  { type: "Organisation des réunions", description: "Clarifier l'objectif de chaque réunion en indiquant dans l'objet : Information / Réflexion / Décision" },
  { type: "Organisation des réunions", description: "Séquencer les réunions longues en ciblant les audiences" },
  { type: "Organisation des réunions", description: "Changer la durée par défaut des réunions" },
  { type: "Organisation des réunions", description: "Accepter de refuser des invitations aux réunions mal ciblées" },
  { type: "Organisation des réunions", description: "S'imposer une réponse définitive 48h avant pour permettre à l'organisateur de mieux préparer sa réunion" },
  { type: "Organisation des réunions", description: "Utiliser la méthode ROTI (Return On Time Invested)" },

  // Lutte contre le multi-tâches
  { type: "Lutte contre le multi-tâches", description: "Prévoir des 'pauses emails' pendant les réunions toutes les 90 minutes" },
  { type: "Lutte contre le multi-tâches", description: "Formaliser un 'contrat de concentration' avec ses collègues : des réunions plus courtes en échange d'une interdiction d'utiliser les ordinateurs et smartphones" },
  { type: "Lutte contre le multi-tâches", description: "Stimuler l'engagement des collègues : plus d'interactions, moins de personnes, plus court" },
  { type: "Lutte contre le multi-tâches", description: "Déposer son téléphone en début de réunion dans une boîte collective" },

  // Management et exemplarité
  { type: "Management et exemplarité", description: "Mettre en place de la reconnaissance managériale autrement que par email" },
  { type: "Management et exemplarité", description: "Fixer un temps maximal hebdomadaire alloué aux réunions dans son planificateur" },
  { type: "Management et exemplarité", description: "Respecter la disponibilité des autres" },
  { type: "Management et exemplarité", description: "Expérimenter les applications de blocage d'app, pour lutter contre les réflexes de consultation" },
  { type: "Management et exemplarité", description: "Développer l'exemplarité numérique des dirigeant·es" },
  { type: "Management et exemplarité", description: "Adopter de bonnes pratiques pour soutenir activement les collaborateurs" },

  // Pratiques vis-à-vis de l'environnement personnel
  { type: "Pratiques vis-à-vis de l'environnement personnel", description: "Séparer le téléphone professionnel du personnel" },
  { type: "Pratiques vis-à-vis de l'environnement personnel", description: "Négocier avec son entourage pour ne pas être dérangé pendant le temps de travail" },
  { type: "Pratiques vis-à-vis de l'environnement personnel", description: "Ne pas répondre aux sollicitations personnelles sur le temps de travail (sauf urgences)" },
];

module.exports = { bestPractices };

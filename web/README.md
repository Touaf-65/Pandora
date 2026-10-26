# Pandora — application web

Application web de Pandora (web first), en Next.js 16 (App Router), TypeScript et Tailwind CSS 4.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

Autres scripts : `npm run build`, `npm run start`, `npm run lint`.

## Organisation

```
src/
├── app/
│   ├── (app)/        Écrans avec la navigation : accueil, recherche, littérature, musique, art,
│   │                 bibliothèque, profil, studio, projets, compte, admin
│   ├── (public)/     Sans compte : connexion, inscription, onboarding, tarifs
│   ├── (immersif)/   Plein écran : lecteur de chapitre, éditeur de chapitre
│   ├── layout.tsx    Racine (police, métadonnées)
│   └── globals.css   Jetons de design (couleurs, police) — palette provisoire
├── components/
│   ├── layout/       Barre latérale, barre du haut, navigation mobile, lecteur audio
│   └── ui/           Composants partagés
└── lib/
    └── navigation.ts Entrées de menu
```

Les dossiers entre parenthèses sont des groupes de routes : ils partagent un layout sans apparaître dans l'URL.

Chaque page affiche pour l'instant un contenu provisoire (`PagePlaceholder`) qui liste les blocs prévus,
d'après la proposition d'écrans. La palette définitive se règle dans `src/app/globals.css`.

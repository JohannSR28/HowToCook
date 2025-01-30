# How To Cook

Lien du site web https://how-to-cook-cyan.vercel.app/

## Description
**How To Cook** est une plateforme web permettant aux utilisateurs de partager, créer, modifier, mettre à jour et supprimer des recettes. Les visiteurs peuvent consulter les recettes disponibles, tandis que les utilisateurs authentifiés peuvent gérer leurs propres recettes.

🚨 **Note** : En raison du plan gratuit utilisé pour héberger le backend, ce dernier peut mettre quelques minutes à démarrer, ce qui peut entraîner un retard sur les premiers appels comme le login et l'affichage des recettes.


## Fonctionnalités
- 🔍 Consultation de recettes sans compte
- ✅ Inscription et connexion des utilisateurs
- 📝 Création, modification et suppression de recettes (CRUD) pour les utilisateurs connectés
- 🗂️ Stockage des recettes dans une base de données MongoDB
- 🔒 Sécurisation des mots de passe avec **bcrypt**
- 🔑 Gestion des sessions avec **JWT**
- ⚡ Application optimisée avec Next.js pour un rendu rapide et efficace

## Stack Technologique
- **Frontend** : Next.js, CSS
- **Backend** : Node.js, TypeScript, MongoDB
- **Sécurité** : bcrypt (hashing des mots de passe), JWT (authentification des sessions)
- **Déploiement** : Vercel

## Installation et Lancement
### Prérequis
- Node.js installé (v16+ recommandé)
- MongoDB en service (local ou distant)

### Installation
1. Cloner le projet : 
   ```bash
   git clone https://github.com/ton-repo/how-to-cook.git
   cd how-to-cook (pour le front-end)
   cd backend (pour le back-end)
   ```
   Le backend et le front end doivent être initialisés séparément.
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Configurer les variables d'environnement :
   Créer un fichier `.env.local` à la racine du projet avec les valeurs suivantes :
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/how-to-cook
   NEXTAUTH_SECRET=<secret>
   NEXTAUTH_URL=http://localhost:3000
   JWT_SECRET=<jwt_secret>
   ```
4. Lancer le projet en mode développement :
   ```bash
   npm run dev
   ```

## Déploiement
Le projet est déployé sur **Vercel**. Pour déployer ta propre version :
1. Créer un compte sur [Vercel](https://vercel.com/)
2. Lier le dépôt GitHub à Vercel
3. Définir les variables d'environnement dans les settings Vercel
4. Déployer 🚀

## Contribuer
Les contributions sont les bienvenues ! N'hésite pas à forker le projet et proposer une PR.

## Licence
MIT License

## Contact
Pour toute question ou suggestion, n'hésite pas à me contacter à [souroujohann82@gmail.com].


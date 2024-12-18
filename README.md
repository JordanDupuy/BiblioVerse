# 📚 BiblioVerse - Gestion de bibliothèque

## 🛠️ Prérequis
Avant de commencer, assure-toi d'avoir les outils suivants installés sur ta machine :

Node.js : Pour télécharger Node.js, cliquez [ici](https://nodejs.org/).

Angular CLI : 
```bash 
npm install -g @angular/cli 
```

PostgreSQL : Pour télécharger PostgreSQL, cliquez [ici](https://www.postgresql.org/download/).

Prisma CLI : 
```bash 
npm install prisma @prisma/client
```

## ⚙️ Configuration de l'environnement
Installez les dépendances pour le backend et le frontend :

Backend :

```bash 
cd BiblioVerse
npm install
```
Frontend (Angular) :

```bash
cd library-management
npm install
```

## Configuration de la base de données PostgreSQL avec psql
### 1. Lancement de psql

Ouvrez psql ou SQL Shell sur votre ordinateur.

Connectez-vous à PostgreSQL avec l'utilisateur postgres (créé lors de l'installation) :
```bash
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]: postgres
Mot de passe pour l'utilisateur postgres :
```

### 2. Créer une base de données

Dans psql, tapez la commande suivante pour créer une base de données nommée library_management :
```sql
CREATE DATABASE library_db;
```

### 3. Configuration dans Prisma
Créez un fichier .env à la racine du projet avec cette ligne :
```env
DATABASE_URL="postgresql://postgres:mot_de_passe@localhost:5432/library_db"
```
Vous devez juste modifier la partie ```mot_de_passe``` avec le mot de passe que vous avez défini pour l'utilisateur postgres

## 🚀 Démarrage du projet
### 1. Initialisation de la base de données
Dans le dossier backend, exécutez les commandes suivantes pour initialiser Prisma et la base de données :
```bash
npx prisma migrate dev --name init
npx prisma generate
```
Cela va :

- Créer les tables nécessaires dans ta base PostgreSQL.
- Générer le client Prisma pour interagir avec la base.

### 2. Lancer le serveur backend
Toujours dans le dossier Biblioverse, lancez le serveur Node.js :
```bash
npm start
```
Par défaut, le serveur tourne sur http://localhost:3051

### 3. Lancer le frontend Angular
Dans le dossier library-management :
```bash
ng serve
```
Par défaut, l'application Angular tourne sur http://localhost:4200

# 📁 Structure du projet
BIBLIOVERSE/
│

├── backend/                      # Dossier pour le backend

│   ├── routes/                   # Routes backend

│   │   └── post.routes.js        # Fichier de routes pour les posts

│   └── server.js                 # Point d'entrée du serveur backend

│

├── library-management/           # Projet Angular pour le frontend

│   ├── .angular/                 # Configuration Angular CLI

│   ├── .vscode/                  # Configuration pour VS Code

│   ├── node_modules/             # Dépendances Node.js

│   ├── public/                   # Fichiers publics (assets, etc.)

│   ├── src/                      # Dossier source

│   │   ├── app/                  # Dossier principal de l'application Angular

│   │   │   ├── components/       # Composants Angular

│   │   │   │   ├── add-book/     # Composant pour ajouter un livre

│   │   │   │   │   ├── add-book.component.css

│   │   │   │   │   ├── add-book.component.html

│   │   │   │   │   ├── add-book.component.spec.ts

│   │   │   │   │   └── add-book.component.ts

│   │   │   │   ├── book-list/    # Composant pour afficher la liste des livres

│   │   │   │   │   ├── book-list.component.css

│   │   │   │   │   ├── book-list.component.html

│   │   │   │   │   ├── book-list.component.spec.ts

│   │   │   │   │   └── book-list.component.ts

│   │   │   ├── services/         # Services pour les appels API et traitements

│   │   │   │   ├── book.service.spec.ts

│   │   │   │   ├── book.service.ts

│   │   │   │   ├── http.interceptor.spec.ts

│   │   │   │   └── http.interceptor.ts

│   │   │   ├── app.component.css

│   │   │   ├── app.component.html

│   │   │   ├── app.component.spec.ts

│   │   │   ├── app.component.ts

│   │   │   ├── app.config.ts

│   │   │   └── app.routes.ts

│   │   ├── index.html            # Page d'accueil principale

│   │   ├── main.ts               # Point d'entrée Angular

│   │   └── styles.css            # Fichier global de styles

│   │

│   ├── .editorconfig             # Configuration de l'éditeur de texte

│   ├── .gitignore                # Fichier pour ignorer les fichiers Git

│   ├── angular.json              # Configuration Angular

│   ├── package-lock.json         # Version lock des dépendances npm

│   ├── package.json              # Fichier de configuration npm

│   ├── README.md                 # Documentation principale du projet

│   ├── tsconfig.app.json         # Configuration TypeScript pour l'app

│   ├── tsconfig.json             # Configuration principale TypeScript

│   └── tsconfig.spec.json        # Configuration TypeScript pour les tests

│

├── node_modules/                 # Dépendances backend (Node.js)

│

├── prisma/                       # Dossier pour Prisma ORM

│   ├── migrations/               # Historique des migrations Prisma

│   └── schema.prisma             # Schéma principal de la base de données

│
├── .env                          # Variables d'environnement

├── .gitignore                    # Configuration Git

├── package-lock.json             # Dépendances du projet global

└── package.json                  # Configuration globale npm

# ✅ Fonctionnalités principales
- Ajout de livres : Formulaire pour ajouter un livre.
- Liste des livres : Affichage dynamique des livres ajoutés.
- API REST avec Node.js pour gérer les opérations CRUD.
- Base de données gérée avec PostgreSQL et Prisma.

# Financia/Tool - Application de Gestion de Budget Personnel

## Présentation

Financia/Tool est une application web de gestion de budget personnel pour les étudiants développée avec Vue.js 3, TypeScript, et Tailwind CSS. Cette application permet aux utilisateurs de suivre leurs revenus et dépenses, de gérer leur profil et de visualiser leur situation financière de manière claire et intuitive.

## Équipe de Développement

Cette application a été développée par :

- **Anouk** : Développement des services et interfaces User avec intégration des logiques et vues du profil utilisateur. Responsable des systèmes de validation pour les composants utilisateur.
- **Asma** : Développement des services et interfaces SchoolDetails avec intégration des logiques et vues d'authentification. Responsable des systèmes de validation pour les composants d'authentification.
- **Cristian** : Développement des services et interfaces AddressDetails avec intégration des vues de gestion du budget. Responsable des systèmes de validation pour les composants de gestion du budget.
- **Steve** : Porte-parole d'equipe. Responsable de l'architecture-worflow-framework. Debugging, integration des services et interfaces de Transaction et BankingDetails, ainsi que des stores de l'application.

## Fonctionnalités

### Gestion des Utilisateurs

- Inscription et connexion 
- Gestion du profil utilisateur
- Stockage des informations personnelles, d'adresse, de détails bancaires et scolaires

### Gestion du Budget

- Ajout, modification et suppression de transactions (revenus et dépenses)
- Catégorisation des transactions
- Visualisation de résumé du budget (revenus, dépenses, solde)
- Gestion des transactions récurrentes avec différentes fréquences (journalière, hebdomadaire, mensuelle, etc.)

## Technologies Utilisées

- **Frontend** : Vue.js 3, TypeScript, Pinia, Vue Router
- **UI** : Tailwind CSS, DaisyUI
- **Build Tool** : Vite
- **Linters/Formatters** : ESLint, Prettier

## Architecture du Projet

Le projet est organisé selon une architecture modulaire avec les répertoires suivants :

- **src/components** : Composants Vue.js réutilisables
- **src/views** : Pages principales de l'application
- **src/models** : Interfaces TypeScript définissant les structures de données
- **src/stores** : Stores Pinia pour la gestion d'état
- **src/services** : Services pour la communication avec l'API
- **src/router** : Configuration des routes de l'application
- **src/assets** : Ressources statiques (CSS, images, etc.)

## Flux Architectural MVC

L'application suit un flux architectural inspiré du modèle MVC (Modèle-Vue-Contrôleur) adapté au contexte de Vue.js :

- **Modèle (Model)** :

  - Les interfaces TypeScript dans le dossier `src/models` définissent la structure des données
  - Les stores Pinia dans `src/stores` gèrent l'état de l'application et la logique métier
  - Les services dans `src/services` encapsulent la communication avec l'API

- **Vue (View)** :

  - Les composants Vue.js dans `src/components` forment l'interface utilisateur
  - Les vues dans `src/views` représentent les pages complètes de l'application
  - Utilisation de la syntaxe `<template>` de Vue pour le rendu HTML

- **Contrôleur (Controller)** :
  - La logique de contrôle est répartie entre les composantes Vue (méthodes et événements)
  - Les hooks de cycle de vie Vue (`setup`, `onMounted`, etc.) gèrent le flux d'exécution
  - Le router Vue dans `src/router` contrôle la navigation et le routage

Ce flux permet une séparation claire des responsabilités : les données (modèle) sont séparées de l'interface utilisateur (vue), et la logique d'application (contrôleur) orchestre les interactions entre les deux.

## Installation

```bash
# Cloner le dépôt
git clone [https://github.com/Steve05h20/Project-Synthese-T3.git]

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## Scripts Disponibles

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run type-check` : Vérifie les types TypeScript
- `npm run lint` : Exécute ESLint pour trouver et corriger les problèmes
- `npm run format` : Formate le code avec Prettier

## Communication avec l'API

L'application communique avec une API REST hébergée à `https://money-pie-3.fly.dev/api/v1/` pour :

- Authentification et gestion des utilisateurs
- Opérations CRUD sur les transactions
- Récupération et mise à jour des données de profil

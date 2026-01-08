# Documentation Front-End - Gestion d'évènements

Ce projet consiste en la réalisation d'une interface web moderne et performante pour une startup spécialisée dans la gestion d'événements. L'objectif est de fournir un outil permettant de piloter efficacement les événements et les participants au sein d'une agence web.

## Features

L'application permet de :

- 🚀 Visualiser la liste complète des événements avec leurs informations clés (nom, date, lieu, nombre de participants).
- ⚡️ Filtrer et Rechercher des événements par statut (à venir, en cours, terminés) ou par nom.
- 🔄 Gérer le cycle de vie : ajouter de nouveaux événements via un formulaire, modifier les informations existantes ou supprimer un événement avec confirmation.
- 🎉 Administrer les participants : consulter la liste des inscrits et ajouter de nouveaux participants à un événement.
- 📖 Analyser : consulter des statistiques globales sur l'activité de la plateforme.

 
### Installation

[Accéder à la documentation de l'installation](./documentation/Installation.md)

### Stack Technique
 
Pour répondre aux besoins de maintenabilité et de performance, les technologies suivantes ont été imposées :

- Framework : React avec TypeScript pour un typage rigoureux.
- Routage : React Router pour une navigation fluide sans rechargement de page.
- Gestion d'état : Context API pour centraliser les données globales (événements, statistiques).
- Communication API : Consommation d'une API REST JSON (simulée par json-server).

## Helpers

- [To create type in typescript ](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [To build router](https://reactrouter.com/start/framework/routing)
- [Default navbar component](https://github.com/Johane4/React-CDA-ESD_Paris/tree/main/03_react_advanced/src/components)
- [Default styles](https://github.com/Johane4/React-CDA-ESD_Paris/blob/main/03_react_advanced/src/styles/Header.css) 
- [To use json-server](https://blog.eleven-labs.com/fr/json-server/#:~:text=json%2Dserver%20nous%20permet%20d,routes%20(%20%2Farticles%2F1%20))
- [How to use .env in React+TypeScript app](https://stackoverflow.com/questions/64453045/how-to-use-env-file-in-a-react-js-with-typescript-project)
- [Most conventional Fetch syntax](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Use UseRef in React](https://react.dev/reference/react/useRef)
- [Use Form](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)
- [Context in React+TypeScript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)
- [Context in React+TypeScript](https://blog.logrocket.com/how-to-use-react-context-typescript/)
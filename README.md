# Asset Manager App

A simple asset tracking demo composed of a React (Vite + TypeScript) client and an Express + Drizzle + PostgreSQL server. The UI lists hardware assets, allows adding new ones, and exposes REST endpoints for CRUD operations backed by a relational database.

## Features
- Browse a tabular list of assets with status chips and action buttons.
- Create new assets through a minimal form that posts to the backend.
- REST API with endpoints for listing, reading, creating, updating, and deleting assets.
- Postgres schema managed via Drizzle ORM for type-safe queries and migrations.

## Tech Stack
- **Client:** React 19, React Router 7, Vite, TypeScript.
- **Server:** Express 5, Drizzle ORM, Node-Postgres, TypeScript, tsx runtime.
- **Database:** PostgreSQL (connection string supplied via `DATABASE_URL`).

## Prerequisites
- Node.js 20+ (needed for both client and server).
- npm (bundled with Node).
- PostgreSQL database instance you can connect to.

## Screen capture
![screen capture of the app](image.png)


## Project Structure
```
asset-manager-app/
├─ client/          # React frontend (Vite)
│  └─ src/
│      ├─ AssetList.tsx
│      ├─ AddAsset.tsx
│      └─ ...
└─ server/          # Express API + Drizzle
   └─ src/db/
       ├─ index.ts  # API entry point
       └─ schema.ts # Drizzle schema definition
```

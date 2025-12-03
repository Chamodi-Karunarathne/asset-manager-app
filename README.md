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

## Getting Started

### 1. Clone & install
```bash
# inside your workspace
npm install # optional: runs at repo root if you have shared deps

cd client
npm install

cd ../server
npm install
```

### 2. Configure environment
Create `server/.env` with at least:
```
DATABASE_URL=postgres://username:password@host:5432/asset_db
PORT=5000 # optional (defaults to 5000)
```
Ensure the referenced database exists. Apply your schema/migrations (e.g., via `drizzle-kit push` if you have it configured) before starting the API.

### 3. Run the backend
```bash
cd server
npx tsx src/db/index.ts
```
This starts the Express server on `http://localhost:5000` and exposes the `/api/assets` endpoints.

### 4. Run the frontend
```bash
cd client
npm run dev
```
Open the Vite dev server URL it prints (usually `http://localhost:5173`). The client expects the API at `http://localhost:5000`.

## Available npm Scripts

### Client (`client/package.json`)
- `npm run dev` – start Vite in development mode.
- `npm run build` – type-check and build the production bundle.
- `npm run preview` – preview the production build locally.
- `npm run lint` – run ESLint.

### Server (`server/package.json`)
Currently only `npm test` (placeholder). Use `npx tsx src/db/index.ts` or add a `dev` script such as:
```json
"scripts": {
  "dev": "tsx src/db/index.ts"
}
```

## API Endpoints
(All prefixed with `http://localhost:5000/api` by default.)
- `GET /assets` – list all assets.
- `GET /assets/:id` – fetch a single asset.
- `POST /assets` – create a new asset (expects `itemType`, `serialNumber`, `status`, `purchaseDate`).
- `PUT /assets/:id` – update an existing asset.
- `DELETE /assets/:id` – remove an asset.

## Notes & Tips
- If `npm run dev` fails in the server folder, define the script as shown above or run `npx tsx ...` directly.
- The client fetch URLs are hard-coded to `http://localhost:5000`; adjust or proxy if you deploy elsewhere.
- To inspect current vulnerabilities run `npm audit` within each package (`client` and `server`).



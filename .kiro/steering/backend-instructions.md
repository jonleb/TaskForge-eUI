# Backend (Mock Server) Steering Rules

## Use the Mock Server

This project includes a local Express/json-server mock backend in `mock/server.js`.

- For any backend API needs, add or modify endpoints in the `mock/` folder.
- Start the full dev environment (frontend + mock server) with: `npm start`
- Start only the mock server with: `npm run start-mock-server`
- Do NOT set up separate backend services or external API stubs.

## Running Backend Tests

- Mock server tests (Jest + supertest): `npm run test:mock`
- After modifying mock endpoints, restore the DB: `git checkout mock/db/db.json`

## Backend Definition of Done

- Mock server changes include integration tests (Jest + supertest) for new or modified endpoints.
- All existing backend tests still pass: `npm run test:mock`.

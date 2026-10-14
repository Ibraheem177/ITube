# ITube Frontend

React 19 single-page app for ITube, built with **Vite**. It includes **Swagger UI** at `/api-docs`, which documents the Spring Boot backend's REST API.

## Quick start

Requires Node.js 20.19+ or 22.12+ (developed on Node 24).

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000 (opens automatically)
```

| Command           | What it does                                              |
|-------------------|-----------------------------------------------------------|
| `npm run dev`     | Starts the dev server with hot reload (`npm start` is the same) |
| `npm run build`   | Creates the production bundle in `build/`                 |
| `npm run preview` | Serves the production build locally to check it          |
| `npm test`        | Runs the tests with Vitest (watch mode)                   |

## Project layout

```
frontend/
├── index.html              # HTML entry point (Vite serves this, then loads src/index.jsx)
├── vite.config.js          # Dev server, /api proxy, build and test settings
├── public/
│   └── openapi.yaml        # API contract shown in Swagger UI  ← edit this when endpoints change
└── src/
    ├── index.jsx           # Picks the page: /api-docs → Swagger UI, anything else → the ITube app
    ├── App.jsx             # Main ITube layout (header, sidebar, categories, video grid)
    ├── components/         # UI components
    ├── data/videos.js      # Mock video data until the backend serves real data
    └── pages/ApiDocs.jsx   # Swagger UI page
```

## API documentation (Swagger)

### What it is
[Swagger UI](https://swagger.io/tools/swagger-ui/) (`swagger-ui-react`) reads an **OpenAPI** file and turns it into an interactive web page. The page lists every endpoint, its parameters and its response shape, and has a **Try it out** button that sends a real request.

It is the contract between frontend and backend: both sides agree on the shape of each endpoint here before or while building it.

### How to open it
1. `npm run dev`
2. Go to **http://localhost:3000/api-docs**

### How it works
```
Browser ──/api-docs──▶ src/index.jsx ──(lazy loads)──▶ pages/ApiDocs.jsx
                                                         │
                                                         ▼  fetches the spec
                                                 public/openapi.yaml
                                                         │
                     "Try it out" ──/api/...──▶ Vite proxy ──▶ Spring Boot :8080
```
- **Lazy loading:** Swagger UI is large (~1.3 MB), so it lives in its own bundle. It is only downloaded when someone opens `/api-docs`, which keeps the main ITube app fast.
- **Proxy:** in dev, requests to `/api/...` are forwarded to `http://localhost:8080` (Spring Boot), so "Try it out" works without any CORS setup. "Try it out" only succeeds once the backend is running and the endpoint exists.

### Current state
The backend has no endpoints yet. `openapi.yaml` contains one **placeholder** endpoint, `GET /api/videos`. Its `Video` schema matches the mock data in `src/data/videos.js`, so it serves as a worked example to copy.

### Adding an endpoint (day-to-day workflow)
1. Open `public/openapi.yaml`.
2. Add the path under `paths:`, and any new data shapes under `components.schemas`:
   ```yaml
   /videos/{id}:
     get:
       tags: [Videos]
       summary: Get one video
       parameters:
         - name: id
           in: path
           required: true
           schema: { type: integer }
       responses:
         '200':
           description: The video
           content:
             application/json:
               schema: { $ref: '#/components/schemas/Video' }
         '404':
           description: Video not found
   ```
3. Save. The dev server reloads and the endpoint appears at `/api-docs`.
4. Remove the "PLACEHOLDER" note from an endpoint once the backend implements it.

Reference: [OpenAPI 3.1 specification](https://spec.openapis.org/oas/v3.1.0) · [Swagger editor](https://editor.swagger.io/) (paste the YAML there to check for errors)

### Later: let the backend generate the spec
When the backend grows, you can have Spring generate the spec from the Java code instead of maintaining it by hand. To do that, add [springdoc-openapi](https://springdoc.org/) to `pom.xml`, which serves the spec at `/v3/api-docs`. Then point the page at it without code changes, by creating `frontend/.env.local`:
```
VITE_OPENAPI_URL=http://localhost:8080/v3/api-docs
```
(`ApiDocs.jsx` reads `VITE_OPENAPI_URL` and falls back to `/openapi.yaml`.) The backend then needs to allow CORS from `localhost:3000`, or you can add `/v3` to the proxy in `vite.config.js`.

## Changes made in the Vite migration (and why)

| Problem | Cause | Fix |
|---|---|---|
| `npm run dev` failed | Create React App (`react-scripts`) only defines `npm start`; there was no `dev` script | Moved to Vite, which provides `dev`, `build`, `preview` and `test` |
| Many `npm audit` vulnerabilities | `react-scripts` 5.0.1 is deprecated (no updates since 2022) and pulls in hundreds of outdated packages | Removed `react-scripts` |
| App would crash on load | `web-vitals` v6 removed `getCLS`/`getFID`/… | `reportWebVitals.js` now uses `onCLS`/`onINP`/… (INP replaced FID) |
| 4 moderate vulns from Swagger | `swagger-ui-react` → `remarkable` → old `argparse@1` → `sprintf-js` (no patched version exists) | `overrides` in `package.json` forces `argparse@2`, which has no `sprintf-js` dependency. remarkable only uses argparse for its command-line tool, which we never run |
| React 19 peer-dependency warnings | Two Swagger sub-dependencies declare support only up to React 18 | `overrides` tell npm to use our React version; they work fine with it |

Other migration details: files that contain JSX were renamed `.js` → `.jsx` (Vite requires this). `public/index.html` moved to `frontend/index.html`, and its `%PUBLIC_URL%` references were removed. Jest was replaced by Vitest, and the Testing Library packages moved to `devDependencies`.

**Result:** `npm audit` → **0 vulnerabilities**.

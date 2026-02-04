# WFRC Wasatch Choice Developer Instructions

## Project Overview
- **Stack**: React (Vite), JavaScript, Sass (`.scss`), Bootstrap (via `reactstrap`), ArcGIS Maps SDK for JavaScript (`@arcgis/core`), PNPM.
- **Architecture**: Configuration-driven single-page application.
- **State Management**: `URLParamsContext` syncing state with URL parameters; local state for map interactions.

## Key Workflows
- **Start**: `pnpm start` (Vite)
- **Test**: `pnpm test` (Vitest), `pnpm run cypress:open` (Cypress E2E)
- **Lint**: `pnpm run lint` (ESLint)
- **Config**: Edit `public/config.json` (schema validated against `public/config.schema.json`).

## Architectural Patterns
- **Configuration**: The app relies heavily on `public/config.json`. `src/config.js` loads and validates this at runtime.
    - *Note*: `vite.config.js` has a custom plugin `watchConfigFiles` to full-reload on config changes.
    - *Testing*: Tests pre-load config via `setupTests.js`.
- **Esri Integration**:
    - `MapView` and specific widgets (`Sherlock`, `MapWidget`) manage map instances.
    - Avoid direct DOM manipulation; let Esri widgets handle their DOM nodes or wrap them in React refs.
    - Use `src/components/esrijs` for shared map components.
- **URL Synchronization**:
    - Centralized in `src/URLParams.jsx` (`URLParamsContext`, `urlParamsReducer`).
    - Actions like `MAP_EXTENT`, `CURRENT_TAB_ID`, `LANGUAGE` update the URL.
- **Internationalization**:
    - Uses `i18next` with `useSpecialTranslation` hook.
    - Translations defined in `config.json` under `translations`.

## Coding Conventions
- **Components**: Functional components with Hooks. Located in `src/components/<FeatureName>/`.
- **Styling**: SCSS modules or global `App.scss`. `MapLens` controls the sidebar layout.
- **Environment**: `Vite` environment variables (e.g., `import.meta.env.VITE_DISCOVER` for quad word).

## File Structure
- `public/`: Runtime assets and configuration (`config.json`).
- `src/components/`: Feature-based component organization.
- `src/hooks.js`: Custom hooks.
- `cypress/`: End-to-end tests.

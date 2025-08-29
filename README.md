# Neo-Noir SPA

Vite + React + TypeScript + Tailwind single-page app for Andres Ossa.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – typecheck + build
- `npm run preview` – preview production build
- `npm run typecheck` – TypeScript in build mode
- `npm run lint` – ESLint
- `npm run lint:fix` – ESLint with fixes
- `npm run format` – Prettier format
- `npm test` – Vitest (jsdom) tests

## Requirements

- Node.js 18+ (recommended 20)

## Testing

Vitest + Testing Library is configured. Run `npm test`.

## Linting & Formatting

ESLint with `@typescript-eslint`, `eslint-plugin-react`, and Prettier integration.

## Accessibility

- Skip link is provided.
- Focus is moved to main content on route changes.
- Animations respect `prefers-reduced-motion`.

## Routing & Deployment

App uses `BrowserRouter`. Ensure your host rewrites unknown routes to `/index.html`.
For GitHub Pages, consider `HashRouter` or an SPA 404 redirect.


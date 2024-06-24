# Contributing to Smart Business

Thank you for contributing to Smart Business. This document outlines the workflow we follow for changes to the customer web application.

## Development Setup

1. Fork and clone the repository
2. Install dependencies with `npm install`
3. Configure `.env.local` from `.env.development`
4. Run `npm run dev` and verify the app loads at `http://localhost:3000`

## Branch Naming

- `feature/<short-description>` — new functionality
- `fix/<short-description>` — bug fixes
- `chore/<short-description>` — tooling and maintenance

## Commit Messages

Use conventional commits:

```
feat(checkout): add wallet split payment option
fix(cart): correct addon total when quantity changes
chore(deps): bump next to 15.5.9
test(utils): cover midnight store schedule edge case
```

## Pull Request Checklist

- [ ] Changes are scoped to the described problem
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run test` passes
- [ ] New utility logic includes unit tests
- [ ] Translations updated in all language files when copy changes

## Code Style

- Match existing file conventions (JS vs TS per directory)
- Prefer existing helpers in `src/utils` and `src/helper-functions`
- Keep components focused; extract reusable logic into utilities
- Run Prettier before committing

## Reporting Issues

Include reproduction steps, expected behavior, module type (food/grocery/etc.), and browser version when filing bugs.

# Smart Business

Smart Business is a production-grade multi-vendor commerce platform built with Next.js. It powers food delivery, grocery, pharmacy, e-commerce, parcel logistics, and rental services from a single customer-facing web application.

## Features

- Multi-module storefront (food, grocery, pharmacy, e-commerce, parcel, rental)
- Real-time order tracking and wallet payments
- Multi-language support (English, Arabic, Spanish, Bengali)
- Store and delivery partner onboarding flows
- Campaigns, flash sales, coupons, and referral programs
- Responsive UI with Material UI and Emotion

## Tech Stack

- **Framework:** Next.js 15 (Pages Router)
- **UI:** React 19, MUI 5, Emotion
- **State:** Redux Toolkit, React Query
- **Maps:** Google Maps API
- **Auth:** Firebase, JWT, social login
- **i18n:** i18next

## Prerequisites

- Node.js 20+
- npm or yarn

## Local Development

```bash
# Install dependencies
npm install

# Copy environment template and configure API endpoints
cp .env.development .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL |
| `NEXT_PUBLIC_GOOGLE_MAP_KEY` | Google Maps API key |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase client configuration |

See `.env.development` and `.env.production` for the full list.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run type-check` | TypeScript validation |

## Docker

```bash
# Build image
docker build -t smart-business-web .

# Run container
docker run -p 3000:3000 --env-file .env.production smart-business-web

# Or use Docker Compose
docker compose up --build
```

## Testing

The project maintains 100% test coverage on core utility and helper modules. Run:

```bash
npm run test:coverage
```

Coverage reports are written to `coverage/`.

## Project Structure

```
├── pages/              # Next.js routes and API handlers
├── src/
│   ├── api-manage/     # API hooks and clients
│   ├── components/     # React components
│   ├── helper-functions/
│   ├── redux/          # Global state
│   ├── utils/          # Shared utilities
│   └── language/       # i18n translations
├── public/             # Static assets
└── __tests__/          # Unit tests
```

## Deployment

Production deployments use the included `Dockerfile` or PM2 via `deploy.sh`:

```bash
chmod +x deploy.sh
./deploy.sh
```

## License

Proprietary — Smart Business © 2024–2026 BrookGT. All rights reserved.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

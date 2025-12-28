# DaanaRx Backend Service

GraphQL backend service for DaanaRx pharmacy inventory management system.

## Features

- GraphQL API with Apollo Server
- JWT-based authentication
- Multi-clinic support
- Supabase integration
- CORS configured for web and mobile clients

## Tech Stack

- Node.js + Express
- Apollo Server (GraphQL)
- TypeScript
- Supabase (PostgreSQL)
- JWT for authentication

## Setup

### Prerequisites

- Node.js 18+ installed
- Supabase project configured
- Environment variables configured

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `SUPABASE_ANON_KEY` - Supabase anon key
- `JWT_SECRET` - Secret for JWT token signing (generate with `openssl rand -base64 32`)
- `PORT` - Port to run the server (default: 4000)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

### Development

Run the development server with hot reload:

```bash
npm run dev
```

Server will start at `http://localhost:4000`

### Production

Build and start the production server:

```bash
npm run build
npm start
```

## API Endpoints

- `POST /graphql` - GraphQL API endpoint
- `GET /graphql` - GraphQL Playground (dev only)
- `GET /health` - Health check endpoint
- `GET /` - API information

## GraphQL Schema

The API provides comprehensive pharmacy inventory management including:
- User authentication and authorization
- Multi-clinic support
- Drug inventory management
- Location and lot management
- Check-in/check-out transactions
- Expiry tracking and reporting

See the GraphQL schema at `/graphql` for full documentation.

## Authentication

All authenticated requests must include a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

For multi-clinic access, include the clinic ID header:

```
x-clinic-id: <clinic-id>
```

## Deployment

### Deploy to Render

This service is configured for deployment on Render. See `render.yaml` for configuration.

### Manual Deployment

1. Set environment variables in your hosting platform
2. Run `npm install && npm run build`
3. Start with `npm start`

## Local Development with Frontend Apps

### For Next.js Web App (DaanarRX)

```bash
# In DaanarRX directory
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql npm run dev
```

### For React Native Mobile App

```bash
# In DaanaRx-Mobile directory
EXPO_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql npm start
```

## Project Structure

```
src/
├── graphql/           # GraphQL schema and resolvers
├── services/          # Business logic services
├── middleware/        # Express middleware (auth, etc.)
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── index.ts          # Main server entry point
```

## License

MIT


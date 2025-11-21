# IoZen

IoZen is an AI-powered platform that replaces traditional forms with intelligent chatflows.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: PostgreSQL (Supabase) + Prisma 6
- **AI**: Anthropic Claude
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- Supabase project
- Anthropic API Key

### Installation

1.  Install dependencies:
    ```bash
    pnpm install
    ```

2.  Set up environment variables:
    ```bash
    cp .env.example .env
    # Edit .env with your keys
    ```

3.  Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

4.  Start the development server:
    ```bash
    pnpm dev
    ```

## Project Structure

```
src/
├── app/          # Routes
├── components/   # UI & Features
├── lib/          # Utilities
├── types/        # TypeScript definitions
└── test/         # Test setup
```

## Documentation

- [Contributing](CONTRIBUTING.md)
- [Architecture](../docs/architecture.md)
- [Coding Standards](../docs/standards.md)
- [API Naming](../docs/API-NAMING-STANDARDS.md)
- [AI Guidelines](../docs/AI-GUIDELINES.md)

## Scripts

- `pnpm dev`: Start dev server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run linter
- `pnpm test`: Run tests
- `pnpm test:coverage`: Run tests with coverage

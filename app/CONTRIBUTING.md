# Contributing to IoZen

Thank you for your interest in contributing to IoZen! This document outlines the standards and processes for contributing to the codebase.

## Code Organization

We follow a feature-based architecture:

```
src/
├── app/                    # Next.js App Router (Routes only)
├── components/
│   ├── features/          # Feature-specific logic & UI (e.g., chatflow, chat)
│   ├── ui/                # Reusable, generic UI components (shadcn/ui)
│   └── layout/            # Global layout components
├── lib/                   # Utilities, hooks, and configurations
├── types/                 # Shared TypeScript definitions
└── workflows/             # Vercel Workflows
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files/Directories | `kebab-case` | `chatflow-editor.tsx` |
| Components | `PascalCase` | `ChatflowEditor` |
| Functions/Variables | `camelCase` | `createChatflow` |
| Types/Interfaces | `PascalCase` | `ChatflowSchema` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_FILE_SIZE` |

## Development Process

1.  **Branching**: Create a feature branch from `main`.
    *   `feature/your-feature-name`
    *   `fix/your-bug-fix`
2.  **Development**: Write code following our [Coding Standards](../docs/standards.md).
3.  **Testing**: Add tests for new functionality.
    *   Run `pnpm test` to verify.
4.  **Committing**: Use meaningful commit messages.

## Before Committing

Please ensure you have run the following checks:

- [ ] **Type Check**: `pnpm tsc --noEmit` (Must have 0 errors)
- [ ] **Lint**: `pnpm lint` (Must have 0 errors)
- [ ] **Test**: `pnpm test` (All tests must pass)
- [ ] **Build**: `pnpm build` (Verify production build)

## Database Changes

- **Always** use migrations: `npx prisma migrate dev --name <description>`
- **Never** use `prisma db push` in this project.
- Ensure all queries filter by `workspaceId` for multi-tenancy.

## Documentation

- Update `docs/` if you change architecture or standards.
- Add comments for complex logic.
- Update `README.md` if setup steps change.

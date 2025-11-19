# IoZen - AI-Powered Chatflow Builder

> **Status:** MVP Development (Day 1 Complete)  
> **Timeline:** 5-Day Sprint  
> **Stack:** Next.js 15, Supabase, Prisma, Claude AI, Vercel Workflow

---

## 🎯 Project Overview

IoZen is an AI-powered chatflow builder that enables users to create, manage, and deploy conversational AI workflows. Built with modern web technologies and designed for rapid iteration with AI assistance.

### Key Features (MVP)
- 🤖 **AI-Powered Chatflows** - Create conversational flows with Claude integration
- 📊 **Visual Flow Builder** - Intuitive drag-and-drop interface
- 💾 **Real-time Persistence** - Supabase backend with Prisma ORM
- 🚀 **Instant Deployment** - Vercel Workflow for seamless execution
- 🎨 **Modern UX** - Beautiful, responsive design system

---

## 📁 Project Structure

```
iozen/
├── app/                          # Next.js application
│   ├── src/                      # Application source code
│   ├── prisma/                   # Database schema & migrations
│   └── public/                   # Static assets
├── 01-vision-product-philosophy.md
├── 02-architecture.md
├── 03-technology-stack.md
├── 04-development-methodology.md
├── 05-code-standards-quality-gates.md
├── 06-ai-assisted-development-framework.md
├── 07-testing-strategy.md
├── 08-deployment-operations.md
├── 09-security-compliance.md
├── 10-mvp-scope-definition.md
├── 11-database-schema.md
├── 12-ux-design-system.md
├── 13-visual-prototype.md
└── 14-vercel-workflow-guidelines.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (LTS)
- pnpm 10+
- Vercel CLI
- Supabase account
- Anthropic API key

### Installation

```bash
# Clone the repository
git clone https://github.com/ioZenApp/ioZen-App.git
cd ioZen-App

# Install dependencies
cd app
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run database migrations
pnpm prisma migrate dev

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📚 Documentation

### Genesis Documents (Foundation)
- **[Vision & Philosophy](01-vision-product-philosophy.md)** - Product vision and core principles
- **[Architecture](02-architecture.md)** - System design and technical architecture
- **[Technology Stack](03-technology-stack.md)** - Tech choices and rationale
- **[Development Methodology](04-development-methodology.md)** - Development process and workflow

### Implementation Guides
- **[Code Standards](05-code-standards-quality-gates.md)** - Coding conventions and quality gates
- **[AI-Assisted Development](06-ai-assisted-development-framework.md)** - Working with AI tools
- **[Testing Strategy](07-testing-strategy.md)** - Testing approach and tools
- **[Deployment & Operations](08-deployment-operations.md)** - Deployment pipeline and monitoring
- **[Security & Compliance](09-security-compliance.md)** - Security best practices

### MVP Specifications
- **[MVP Scope](10-mvp-scope-definition.md)** - 5-day MVP feature set
- **[Database Schema](11-database-schema.md)** - Data model and relationships
- **[UX Design System](12-ux-design-system.md)** - Design tokens and components
- **[Visual Prototype](13-visual-prototype.md)** - UI mockups and flows
- **[Vercel Workflow](14-vercel-workflow-guidelines.md)** - Workflow integration guide

---

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run migrations
pnpm prisma:studio    # Open Prisma Studio

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript checks
```

### Git Workflow

1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Make changes**: Follow code standards in documentation
3. **Commit**: Use conventional commits (e.g., `feat:`, `fix:`, `docs:`)
4. **Push**: `git push origin feature/your-feature`
5. **Deploy**: Vercel auto-deploys preview for each push

---

## 🌐 Environment Variables

Required environment variables (see `app/.env.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic (Claude)
ANTHROPIC_API_KEY=

# Database
DATABASE_URL=
```

---

## 📈 Project Status

### Day 1 ✅ (Complete)
- ✅ Development environment setup
- ✅ Next.js project initialization
- ✅ Database schema design
- ✅ UX design system
- ✅ Visual prototype
- ✅ Vercel Workflow integration plan

### Days 2-5 (In Progress)
- 🔄 Core chatflow builder implementation
- 🔄 AI integration with Claude
- 🔄 Real-time collaboration features
- 🔄 Testing and deployment

---

## 🤝 Contributing

This is currently a solo project in active MVP development. Contributions will be welcome after the initial release.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🔗 Links

- **GitHub**: [ioZenApp/ioZen-App](https://github.com/ioZenApp/ioZen-App)
- **Documentation**: See `/docs` directory
- **Issues**: [GitHub Issues](https://github.com/ioZenApp/ioZen-App/issues)

---

**Built with ❤️ using AI-assisted development**

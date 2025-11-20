# IoZen Developer Cheatsheet 🚀

> Complete command reference for IoZen development with Next.js, Prisma, Git, and Cursor AI

**Last Updated:** November 2024
**Your Tech Stack:** Next.js 16, React 19, Prisma, PostgreSQL (Supabase), TypeScript, pnpm

---

## Table of Contents
1. [Daily Development Workflow](#daily-development-workflow)
2. [Git Commands](#git-commands)
3. [pnpm Commands](#pnpm-commands)
4. [Next.js Commands](#nextjs-commands)
5. [Prisma Database Commands](#prisma-database-commands)
6. [Cursor AI Tips](#cursor-ai-tips)
7. [Debugging Commands](#debugging-commands)
8. [Common Scenarios](#common-scenarios)

---

## Daily Development Workflow

### Starting Your Day
```bash
# 1. Open terminal in project root (/Users/jacobomoreno/Dev/iozen)
cd /Users/jacobomoreno/Dev/iozen/app

# 2. Pull latest changes from remote
git pull origin main

# 3. Check if anyone added new packages
pnpm install

# 4. Start the development server
pnpm dev

# Now open http://localhost:3000 in your browser
```

### During Development
```bash
# Create a new branch for your feature
git checkout -b feature/my-new-feature

# Make changes to files...

# Check what you changed
git status

# See the actual changes
git diff

# Stage specific files
git add src/components/MyComponent.tsx

# Or stage everything
git add .

# Commit with a message
git commit -m "Add new feature: XYZ"

# Push to remote
git push origin feature/my-new-feature
```

### End of Day
```bash
# Make sure everything is committed
git status

# Push your branch
git push origin your-branch-name

# Stop the dev server (Ctrl+C in terminal)
```

---

## Git Commands

### Understanding Git Basics
**Git is version control** - like "track changes" in Word but for code. It saves snapshots of your project.

### Setup (One-Time)
```bash
# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check your config
git config --list
```

### Daily Git Commands

#### Checking Status
```bash
git status
# Shows: What files changed, what's staged, current branch
# Use this: ALL THE TIME - before and after everything
```

#### Creating Branches
```bash
# List all branches
git branch

# Create new branch
git branch feature/rate-limiting

# Switch to branch
git checkout feature/rate-limiting

# Create AND switch (shortcut)
git checkout -b feature/rate-limiting

# When to use: Start of every new feature/fix
# Why: Keeps your work isolated from main code
```

#### Viewing Changes
```bash
# See what you changed (not staged)
git diff

# See what you changed (staged)
git diff --staged

# See changes in specific file
git diff src/app/api/chatflow/route.ts

# When to use: Before committing, to review your work
```

#### Staging Changes
```bash
# Stage specific file
git add src/components/MyComponent.tsx

# Stage specific folder
git add src/components/

# Stage everything
git add .

# Unstage a file (undo add)
git reset src/components/MyComponent.tsx

# When to use: After making changes, before committing
# Think of it as: Selecting which changes to save in the next snapshot
```

#### Committing Changes
```bash
# Commit staged changes
git commit -m "Add rate limiting to API endpoints"

# Commit with detailed message
git commit -m "Add rate limiting

- Implement Vercel KV for rate limiting
- Add per-endpoint limits
- Handle rate limit errors gracefully"

# Amend last commit (fix typo or add forgotten file)
git add forgotten-file.ts
git commit --amend --no-edit

# When to use: After staging changes
# Good commit messages: Start with verb, be specific
# Examples:
#   ✅ "Fix authentication bug in login flow"
#   ✅ "Add rate limiting to chatflow API"
#   ❌ "changes"
#   ❌ "fix stuff"
```

#### Pushing to Remote
```bash
# Push current branch
git push

# Push new branch (first time)
git push -u origin feature/rate-limiting

# Force push (DANGEROUS - only use alone on feature branches)
git push --force

# When to use: After committing, to backup work to GitHub/GitLab
# -u origin: Sets up tracking so next time you just use 'git push'
```

#### Pulling Changes
```bash
# Pull latest changes from current branch
git pull

# Pull from main branch
git pull origin main

# When to use: 
# - Start of day
# - Before creating new branch
# - When teammate makes changes
```

#### Switching Branches
```bash
# Switch to existing branch
git checkout main
git checkout feature/rate-limiting

# Switch to main and pull latest
git checkout main && git pull

# When to use: 
# - Moving between features
# - Going back to main to start new feature
```

#### Merging
```bash
# Merge feature branch into current branch
# 1. Switch to main
git checkout main

# 2. Pull latest
git pull

# 3. Merge your feature
git merge feature/rate-limiting

# 4. If conflicts, fix them, then:
git add .
git commit -m "Merge feature/rate-limiting"

# 5. Push
git push

# When to use: When feature is complete and tested
```

#### Viewing History
```bash
# See commit history
git log

# See history (prettier)
git log --oneline --graph --decorate

# See last 5 commits
git log -5

# See changes in a commit
git show COMMIT_HASH

# When to use: Understanding what changed, finding bugs
```

#### Undoing Changes
```bash
# Discard changes in file (CAREFUL - can't undo)
git checkout -- src/components/MyComponent.tsx

# Discard all changes (CAREFUL)
git checkout -- .

# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes (VERY CAREFUL)
git reset --hard HEAD~1

# When to use: When you mess up and want to start over
# HEAD~1 means "one commit before current"
```

#### Stashing (Temporary Save)
```bash
# Save current changes temporarily
git stash

# List all stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# When to use: Need to switch branches but not ready to commit
```

### Git Emergency Commands

```bash
# "Help! I'm on wrong branch!"
git stash                    # Save your changes
git checkout correct-branch  # Switch
git stash pop               # Restore changes

# "Help! I committed to main instead of feature branch!"
git reset --soft HEAD~1      # Undo commit, keep changes
git checkout -b feature/new  # Create feature branch
git add .                    # Stage changes
git commit -m "Message"      # Commit on right branch

# "Help! I have merge conflicts!"
# 1. Open conflicted files in Cursor
# 2. Look for <<<<<<< HEAD and >>>>>>> markers
# 3. Choose which code to keep
# 4. Remove the markers
# 5. Save file
git add .
git commit -m "Resolve merge conflicts"

# "Help! I want to see what changed between branches!"
git diff main..feature/rate-limiting
```

---

## pnpm Commands

### What is pnpm?
It's a package manager - like an app store for code libraries. Faster and more efficient than npm.

### Basic Commands
```bash
# Install all dependencies (from package.json)
pnpm install
# When: After cloning project, or when package.json changes
# Creates: node_modules folder with all libraries

# Add a new package
pnpm add package-name
# Example: pnpm add @upstash/ratelimit
# Updates: package.json and pnpm-lock.yaml

# Add as dev dependency (only needed for development)
pnpm add -D package-name
# Example: pnpm add -D @types/node

# Remove a package
pnpm remove package-name

# Update all packages to latest versions
pnpm update

# Update specific package
pnpm update package-name

# List installed packages
pnpm list

# Check for outdated packages
pnpm outdated
```

### Running Scripts (from package.json)
```bash
# Start development server
pnpm dev
# Runs: next dev
# Opens: http://localhost:3000
# When: Every time you code

# Build for production
pnpm build
# Runs: next build
# When: Before deploying
# Takes: 1-3 minutes

# Start production server (after build)
pnpm start
# Runs: next start
# When: Testing production build locally

# Run linter
pnpm lint
# Runs: eslint
# When: Before committing
# Checks: Code style and potential bugs
```

---

## Next.js Commands

### Development
```bash
# Start dev server
cd app && pnpm dev

# Start on different port
pnpm dev -- -p 3001

# Enable turbopack (faster compilation)
pnpm dev --turbo
```

### File Structure Understanding
```
app/src/app/
├── page.tsx                    # Homepage (/)
├── layout.tsx                  # Root layout (wraps all pages)
├── globals.css                 # Global styles
│
├── (auth)/                     # Route group (URL: /)
│   ├── layout.tsx             # Auth layout
│   ├── dashboard/
│   │   └── page.tsx           # /dashboard
│   └── chatflows/
│       └── [id]/
│           └── page.tsx       # /chatflows/123
│
├── c/
│   └── [shareUrl]/
│       └── page.tsx           # /c/abc123 (public chatflows)
│
└── api/                       # API routes
    └── chatflow/
        └── route.ts           # /api/chatflow (GET)
```

### Creating New Pages
```bash
# Create new page: /pricing
# 1. Create file: app/src/app/pricing/page.tsx
# 2. Add component:
export default function PricingPage() {
  return <div>Pricing</div>
}

# Create dynamic page: /blog/[slug]
# 1. Create: app/src/app/blog/[slug]/page.tsx
# 2. Access param:
export default async function BlogPost({ params }) {
  const { slug } = await params;
  return <div>Post: {slug}</div>
}
```

### Creating API Routes
```bash
# Create: app/src/app/api/users/route.ts
export async function GET(request: Request) {
  return Response.json({ users: [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ success: true })
}
```

---

## Prisma Database Commands

### What is Prisma?
It's your database toolkit - helps you talk to PostgreSQL safely with TypeScript.

### Daily Prisma Commands
```bash
# Navigate to app folder first
cd app

# Open Prisma Studio (visual database browser)
npx prisma studio
# Opens: http://localhost:5555
# Use for: Viewing/editing data visually
# Like: phpMyAdmin but prettier

# Generate Prisma Client (after schema changes)
npx prisma generate
# When: After editing prisma/schema.prisma
# Creates: TypeScript types for your database

# Create a new migration (save schema changes)
npx prisma migrate dev --name add_rate_limiting
# When: After changing schema.prisma
# What it does:
#   1. Creates SQL migration file
#   2. Runs migration on database
#   3. Generates new Prisma Client

# View migration status
npx prisma migrate status

# Reset database (CAREFUL - deletes all data)
npx prisma migrate reset
# When: Development only, to start fresh

# Push schema without migration (quick prototyping)
npx prisma db push
# When: Rapid prototyping, not production

# Pull schema from database
npx prisma db pull
# When: Database changed outside Prisma
```

### Editing Schema
```bash
# 1. Edit: app/prisma/schema.prisma
# 2. Run: npx prisma migrate dev --name description
# 3. Check: app/prisma/migrations/ for new migration
# 4. Commit: Both schema.prisma AND migration files
```

### Example: Adding a New Table
```prisma
// In app/prisma/schema.prisma

model RateLimit {
  id        String   @id @default(cuid())
  key       String   @unique
  count     Int      @default(0)
  resetAt   DateTime
  createdAt DateTime @default(now())
  
  @@map("rate_limits")
}
```

```bash
# Then run:
npx prisma migrate dev --name add_rate_limit_table

# Prisma will:
# ✓ Create migration SQL
# ✓ Run it on database
# ✓ Generate TypeScript types
```

### Using Prisma in Code
```typescript
// app/src/lib/db.ts already has:
import { prisma } from '@/lib/db'

// Query examples:
const chatflows = await prisma.chatflow.findMany()
const chatflow = await prisma.chatflow.findUnique({ 
  where: { id: '123' } 
})
const newChatflow = await prisma.chatflow.create({
  data: { name: 'Test', ... }
})
```

---

## Cursor AI Tips

### Cursor Basics
Cursor is VS Code + AI. It understands your codebase.

### Keyboard Shortcuts
```bash
⌘ + K        # Open AI chat
⌘ + L        # Open AI composer (multi-file edits)
⌘ + I        # Inline edit (edit selected code)
⌘ + Shift + L # Add current file to chat context

# In chat:
@filename.tsx  # Reference specific file
@folder/       # Reference folder
@web          # Search web for current info
@docs         # Search documentation
@codebase     # Search entire codebase
```

### Best Practices with Cursor
```bash
# ✅ Good prompts:
"Add rate limiting to /api/chatflow using Vercel KV"
"Fix TypeScript error in admin-view.tsx"
"Create a new component Button that matches our design system"

# ❌ Bad prompts:
"fix it"
"make it work"
"add stuff"

# Pro tips:
1. Be specific about files: "@admin-view.tsx add loading state"
2. Ask for explanations: "Explain how the chatflow generation works"
3. Request tests: "Write tests for the rate limiting function"
4. Ask about best practices: "What's the best way to handle auth in Next.js?"
```

### Cursor Modes
```bash
# Ask Mode (current):
- Read-only queries
- Asks questions before acting
- Good for: Understanding code, planning

# Agent Mode:
- Can make file changes
- More autonomous
- Good for: Implementing features

# Toggle: Top of Cursor chat panel
```

---

## Debugging Commands

### Next.js Debugging
```bash
# View detailed build output
pnpm build --debug

# Check TypeScript errors
npx tsc --noEmit

# Clear Next.js cache (fixes weird bugs)
rm -rf app/.next
pnpm dev

# Check bundle size
pnpm build && npx @next/bundle-analyzer
```

### Logging & Debugging
```javascript
// Quick debugging
console.log('Value:', variable)
console.table(arrayOfObjects)
console.error('Error:', error)

// Better debugging
console.log({ variable, anotherVar, status })
// Outputs: { variable: 'value', anotherVar: 123, status: 'ok' }
```

### Common Error Fixes
```bash
# "Module not found"
pnpm install

# "Port 3000 already in use"
lsof -ti:3000 | xargs kill -9
# Or start on different port:
pnpm dev -- -p 3001

# "Prisma Client not generated"
npx prisma generate

# "TypeScript errors everywhere"
# Close and reopen Cursor, then:
⌘ + Shift + P → TypeScript: Restart TS Server

# "Git says files are modified but I didn't change them"
# Probably line endings:
git config core.autocrlf input
```

---

## Common Scenarios

### Scenario 1: Starting a New Feature
```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull

# 2. Create feature branch
git checkout -b feature/rate-limiting

# 3. Make changes...

# 4. Test it works
pnpm dev

# 5. Commit
git add .
git commit -m "Add rate limiting to API endpoints"

# 6. Push
git push -u origin feature/rate-limiting
```

### Scenario 2: Someone Asked You to Pull Their Changes
```bash
# 1. Save your current work
git stash

# 2. Pull their changes
git pull

# 3. Install any new packages they added
pnpm install

# 4. Restore your work
git stash pop

# 5. Test everything works
pnpm dev
```

### Scenario 3: Adding a New Package
```bash
# 1. Install it
pnpm add @upstash/ratelimit

# 2. Use it in your code
import { Ratelimit } from '@upstash/ratelimit'

# 3. Commit the package files
git add package.json pnpm-lock.yaml
git commit -m "Add Upstash rate limiting package"
```

### Scenario 4: Database Schema Change
```bash
# 1. Edit schema
code app/prisma/schema.prisma

# 2. Create migration
cd app
npx prisma migrate dev --name add_user_roles

# 3. Commit both files
git add prisma/schema.prisma
git add prisma/migrations/
git commit -m "Add user roles to database schema"
```

### Scenario 5: Something Broke and You Want to Undo
```bash
# If you haven't committed:
git status                    # See what changed
git checkout -- file.tsx      # Undo changes to specific file
git checkout -- .             # Undo ALL changes (careful!)

# If you committed but didn't push:
git reset --soft HEAD~1       # Undo commit, keep changes
git reset --hard HEAD~1       # Undo commit, discard changes (careful!)

# If you already pushed:
git revert HEAD              # Create new commit that undoes last commit
git push
```

### Scenario 6: Deploying to Production
```bash
# 1. Make sure everything is committed
git status

# 2. Switch to main
git checkout main

# 3. Merge your feature
git merge feature/your-feature

# 4. Run production build locally to test
cd app
pnpm build
pnpm start

# 5. Push to main
git push

# Vercel will automatically deploy!
# Check: https://vercel.com/your-project
```

---

## Environment Variables

### Local Development
```bash
# Your .env file: app/.env
DATABASE_URL="postgresql://..."
ANTHROPIC_API_KEY="sk-ant-..."
NEXT_PUBLIC_SUPABASE_URL="https://..."

# NEVER commit .env file!
# It's in .gitignore ✓
```

### Accessing Env Vars
```typescript
// Server-side (API routes, server components)
process.env.DATABASE_URL
process.env.ANTHROPIC_API_KEY

// Client-side (must start with NEXT_PUBLIC_)
process.env.NEXT_PUBLIC_SUPABASE_URL
```

---

## Quick Reference: Daily Commands

```bash
# Morning routine:
cd /Users/jacobomoreno/Dev/iozen/app
git pull
pnpm install
pnpm dev

# While coding:
git status              # Check what changed
git diff               # See changes
git add .              # Stage changes
git commit -m "msg"    # Commit
git push               # Push to remote

# Database changes:
npx prisma studio      # View data
npx prisma migrate dev # Create migration

# Debugging:
rm -rf .next          # Clear cache
pnpm build            # Test build
npx tsc --noEmit      # Check types
```

---

## Learning Resources

### Git
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Oh Sh*t Git](https://ohshitgit.com/) - Fix common mistakes

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- Your project: Read `03-technology-stack.md`

### Prisma
- [Prisma Docs](https://www.prisma.io/docs)
- Your schema: `app/prisma/schema.prisma`

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

---

## Troubleshooting

### "I don't know what command to use"
```bash
# Git:
git status        # Always start here
git log          # See history
git help         # List commands

# pnpm:
pnpm --help
pnpm run         # List available scripts

# Prisma:
npx prisma --help
npx prisma studio  # Visual interface
```

### "Everything is broken"
```bash
# Nuclear option (fixes 90% of issues):
rm -rf node_modules
rm -rf .next
pnpm install
pnpm dev
```

### "Ask for help"
```bash
# Before asking:
1. What command did you run?
2. What error message did you get?
3. What were you trying to do?
4. Copy the full error message

# In Cursor:
⌘ + K → "Explain this error: [paste error]"
```

---

## Glossary

**Branch:** Parallel version of your code
**Commit:** Snapshot of your code at a point in time
**Stage/Staging:** Selecting files to include in next commit
**Push:** Upload commits to remote (GitHub)
**Pull:** Download commits from remote
**Merge:** Combine two branches
**Migration:** Database schema change saved as SQL file
**ORM:** Object-Relational Mapping (Prisma - talk to database with TypeScript)
**Route:** URL path in your app (/dashboard, /api/chatflow)
**Component:** Reusable UI piece (Button, Card, etc.)
**Server Component:** React component that runs on server
**Client Component:** React component that runs in browser (needs "use client")
**API Route:** Backend endpoint (handles requests)
**Middleware:** Code that runs before requests

---

**Pro Tip:** Bookmark this file in Cursor (⌘ + Shift + B) for quick access!

**Remember:** It's okay to not memorize everything. This cheatsheet is here when you need it. You'll naturally remember the commands you use most. 🚀


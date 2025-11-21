# API Naming Standards - IoZen

## Philosophy

> **"The way you do small things is the way you do everything."**

We establish clean conventions from day one, leveraging our pre-launch advantage to create a foundation that will scale as we grow.

---

## Why This Matters

### Pre-Launch Advantage ✅
- **No legacy URLs to support** - Clean slate
- **No external integrations to break** - Freedom to standardize
- **No backward compatibility burden** - Perfect time to establish patterns
- **Foundation for scale** - Good habits compound over time

### Future-Proof Philosophy
```
Small decisions → Daily habits → Codebase culture → Product quality
```

If we're careless with API naming now, we'll be careless with everything later. Excellence is a habit.

---

## Naming Conventions

### ✅ DO: Plural Resource Names

```
GET    /api/chatflows              # List all chatflows
POST   /api/chatflows              # Create new chatflow
GET    /api/chatflows/[id]         # Get one chatflow
PATCH  /api/chatflows/[id]         # Update chatflow
DELETE /api/chatflows/[id]         # Delete chatflow
POST   /api/chatflows/[id]/publish # Custom action
POST   /api/chatflows/submit       # Public submission
```

**Rationale:**
- Industry standard (REST API best practices)
- Clear semantic meaning (operating on collection vs. resource)
- Consistent with other modern APIs (GitHub, Stripe, etc.)
- Easier for developers to predict endpoint structure

### ❌ DON'T: Inconsistent Naming

```
❌ /api/chatflow                   # Singular - inconsistent
❌ /api/chatflows/:id              # Colon-style params (this is Express, not Next.js)
❌ /api/chatflows/get-all          # Redundant action in URL
❌ /api/chatflow/submit            # Mixes singular/plural
```

---

## RESTful Patterns

### Standard HTTP Methods

| Method | Purpose | Example | Returns |
|--------|---------|---------|---------|
| GET | List resources | `GET /api/chatflows` | Array of chatflows |
| GET | Get one resource | `GET /api/chatflows/[id]` | Single chatflow |
| POST | Create resource | `POST /api/chatflows` | Created chatflow |
| PATCH | Update resource | `PATCH /api/chatflows/[id]` | Updated chatflow |
| DELETE | Delete resource | `DELETE /api/chatflows/[id]` | Success status |

### Custom Actions (When Needed)

For operations that don't fit CRUD, use POST with descriptive action:

```
POST /api/chatflows/[id]/publish   # Publish a draft
POST /api/chatflows/[id]/duplicate # Clone existing
POST /api/chatflows/submit         # Submit to chatflow (public)
```

---

## Public vs. Authenticated Endpoints

### Most Endpoints: Require Auth

```typescript
export const GET = createApiHandler(async (req: NextRequest) => {
  const { auth } = await requireAuth()  // ✅ Authentication required
  
  const chatflows = await prisma.chatflow.findMany({
    where: { workspaceId: auth.workspaceId }  // ✅ Workspace isolation
  })
  
  return chatflows
})
```

### Public Endpoints: Validate Resource Accessibility

```typescript
export const POST = createApiHandler(async (req: NextRequest) => {
  const body = await req.json()
  const { chatflowId } = submissionSchema.parse(body)
  
  const chatflow = await prisma.chatflow.findUnique({
    where: { id: chatflowId }
  })
  
  // ✅ Only allow submissions to PUBLISHED chatflows
  if (chatflow.status !== 'PUBLISHED') {
    throw new Error('Chatflow not found')  // 🔒 Security: Don't reveal draft exists
  }
  
  // Public users can submit to published chatflows
  return await createSubmission(chatflowId, data)
})
```

---

## Future Considerations

### When to Add Versioning

**DON'T add versioning now:**
- Pre-launch, no external users
- No integrations to protect
- Premature complexity
- Harder to iterate quickly

**ADD versioning when:**
- Post-launch with real users
- External integrations exist
- Need to introduce breaking changes
- Have legacy support requirements

**Example (future):**
```
/api/v1/chatflows          # Current stable API
/api/v2/chatflows          # New breaking changes
```

### Rate Limiting & Quotas

When we launch, consider:
- Rate limiting per workspace
- Usage quotas based on plan
- API key authentication for integrations
- Webhook endpoints for real-time updates

---

## Decision Record

### Date: 2025-11-20

**Context:**
During Phase 2 refactor, we standardized all API routes from singular to plural naming.

**Decision:**
- Changed: `/api/chatflow/*` → `/api/chatflows/*`
- Rationale: Pre-launch stage is perfect time to establish clean RESTful conventions
- Impact: Zero (no external users or integrations yet)
- All internal references updated successfully

**Outcome:**
- ✅ Consistent RESTful naming across all endpoints
- ✅ Clean foundation for future growth
- ✅ No technical debt from legacy URLs
- ✅ "The way we do small things is the way we do everything"

---

## Related Documentation

- [Architecture](../docs/architecture.md) - API Design section
- [Standards](../docs/standards.md) - API Route Standards section
- [CLAUDE.md](./CLAUDE.md) - API Route Standards section
- [Quick Reference](../docs/quick-reference.md) - API patterns and examples

---

## Checklist: Adding New API Routes

When creating new API endpoints, ensure:

- [ ] Use **plural resource name**: `/api/resources` not `/api/resource`
- [ ] Follow **RESTful patterns**: Correct HTTP methods (GET, POST, PATCH, DELETE)
- [ ] Add **authentication**: Use `requireAuth()` unless truly public
- [ ] Validate **workspace isolation**: Filter by `workspaceId`
- [ ] Use **Zod validation**: Validate all input
- [ ] Use **createApiHandler**: Consistent error handling
- [ ] Return **typed responses**: `ApiResponse<T>` interface
- [ ] Add **tests**: Unit tests for business logic
- [ ] Document **in code**: JSDoc comments for complex logic
- [ ] Update **this doc**: If introducing new patterns

---

**Remember**: Excellence is built through consistency in the small things. Every endpoint matters.


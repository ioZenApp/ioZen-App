# Supabase Realtime Guidelines

This document outlines the standards, patterns, and troubleshooting steps for implementing Supabase Realtime subscriptions in the IoZen application.

## Core Principles

1.  **Sync on Connect**: Always assume you might miss an event during the connection phase. Trigger a data refresh immediately upon successful subscription.
2.  **Efficient Filtering**: Always filter subscriptions by specific IDs (e.g., `id=eq.${chatflowId}`) to reduce bandwidth and client load.
3.  **Secure RLS**: Ensure Row Level Security (RLS) policies are non-recursive and performant.
4.  **Explicit Permissions**: Ensure the `authenticated` role has explicit `SELECT` permissions on the table.

## Standard Implementation Pattern

Use the `ChatflowMonitor` (or similar feature-specific monitor) pattern. This separates the subscription logic from the UI presentation.

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface FeatureMonitorProps {
    entityId: string;
}

export function FeatureMonitor({ entityId }: FeatureMonitorProps) {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel(`feature-${entityId}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE", // Listen for specific events
                    schema: "public",
                    table: "your_table_name",
                    filter: `id=eq.${entityId}`, // ALWAYS filter
                },
                () => {
                    // Trigger server component refresh
                    router.refresh();
                }
            )
            .subscribe((status) => {
                // SYNC ON CONNECT PATTERN
                if (status === "SUBSCRIBED") {
                    router.refresh();
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [entityId, router, supabase]);

    return null; // Renderless component
}
```

## RLS & Database Best Practices

### Avoiding Infinite Recursion
A common cause of Realtime failure is **infinite recursion** in RLS policies. This happens when a policy on Table A queries Table A (directly or indirectly) to check permissions.

**Bad (Recursive):**
```sql
CREATE POLICY "Users view members" ON workspace_members
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members -- RECURSION!
    WHERE profile_id = auth.uid()
  )
);
```

**Good (Security Definer Function):**
Use a `SECURITY DEFINER` function to break the recursion. The function runs with elevated privileges and bypasses RLS for its internal query.

```sql
CREATE OR REPLACE FUNCTION public.is_workspace_member(_workspace_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions -- CRITICAL: Set search_path!
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.workspace_members
    WHERE workspace_id = _workspace_id
    AND profile_id = (auth.uid())::text
  );
END;
$$;

CREATE POLICY "Users view members" ON workspace_members
USING (is_workspace_member(workspace_id));
```

### Explicit Permissions
Supabase Realtime respects RLS, but it also requires basic table permissions. Ensure the `authenticated` role has access:

```sql
GRANT SELECT ON TABLE public.your_table TO authenticated;
```

## Troubleshooting Checklist

If Realtime updates are not working:

1.  **Check Console Logs**:
    *   Is the status `SUBSCRIBED`?
    *   Are there any `403 Forbidden` or `401 Unauthorized` errors?
    *   Are there any `500 Internal Server Error` (often indicates RLS recursion)?

2.  **Verify RLS**:
    *   Can you fetch the record manually using `supabase.from('table').select().eq('id', id)`?
    *   If manual fetch fails, Realtime will also fail.

3.  **Check Permissions**:
    *   Does the `authenticated` role have `GRANT SELECT`?

4.  **Check Data Types**:
    *   Are you comparing UUIDs to Strings correctly in your RLS function?

5.  **Check Search Path**:
    *   Does your `SECURITY DEFINER` function have `SET search_path = public, auth, extensions`?

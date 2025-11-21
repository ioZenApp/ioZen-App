-- ============================================================================
-- FIX 2: Robust RLS Function
-- ============================================================================

-- Update the function to ensure it can access 'auth' schema and 'extensions'
-- This fixes potential issues where auth.uid() is not found or returns null.

CREATE OR REPLACE FUNCTION public.is_workspace_member(_workspace_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions
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

-- Re-apply policies just in case
DROP POLICY IF EXISTS "Users view workspace members" ON workspace_members;
CREATE POLICY "Users view workspace members"
  ON workspace_members FOR SELECT TO authenticated
  USING (
    is_workspace_member(workspace_id)
  );

DROP POLICY IF EXISTS "Users view workspace chatflows" ON chatflows;
CREATE POLICY "Users view workspace chatflows"
  ON chatflows FOR SELECT TO authenticated
  USING (
    is_workspace_member(workspace_id)
  );

DROP POLICY IF EXISTS "Users view member workspaces" ON workspaces;
CREATE POLICY "Users view member workspaces"
  ON workspaces FOR SELECT TO authenticated
  USING (
    is_workspace_member(id)
  );

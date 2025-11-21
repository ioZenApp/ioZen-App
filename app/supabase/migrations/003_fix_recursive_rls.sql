-- ============================================================================
-- FIX: Infinite Recursion in RLS Policies
-- ============================================================================

-- 1. Create a secure function to check membership without triggering RLS
-- This function runs with the privileges of the creator (SECURITY DEFINER),
-- bypassing the RLS on workspace_members table to avoid recursion.
CREATE OR REPLACE FUNCTION public.is_workspace_member(_workspace_id text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM workspace_members
    WHERE workspace_id = _workspace_id
    AND profile_id = (auth.uid())::text
  );
END;
$$;

-- 2. Update "workspace_members" policy to use the function
DROP POLICY IF EXISTS "Users view workspace members" ON workspace_members;
CREATE POLICY "Users view workspace members"
  ON workspace_members FOR SELECT TO authenticated
  USING (
    is_workspace_member(workspace_id)
  );

-- 3. Update "chatflows" policy to use the function (optimization)
DROP POLICY IF EXISTS "Users view workspace chatflows" ON chatflows;
CREATE POLICY "Users view workspace chatflows"
  ON chatflows FOR SELECT TO authenticated
  USING (
    is_workspace_member(workspace_id)
  );

-- 4. Update "workspaces" policy to use the function (optimization)
DROP POLICY IF EXISTS "Users view member workspaces" ON workspaces;
CREATE POLICY "Users view member workspaces"
  ON workspaces FOR SELECT TO authenticated
  USING (
    is_workspace_member(id)
  );

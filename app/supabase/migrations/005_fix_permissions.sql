-- ============================================================================
-- FIX 3: Explicit Permissions & Function Path
-- ============================================================================

-- 1. Grant usage on schema
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- 2. Grant table permissions (CRUD)
-- Ensure 'authenticated' role can actually access these tables
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.workspaces TO authenticated;
GRANT ALL ON TABLE public.workspace_members TO authenticated;
GRANT ALL ON TABLE public.chatflows TO authenticated;

-- 3. Grant execute on function
GRANT EXECUTE ON FUNCTION public.is_workspace_member TO authenticated;

-- 4. Re-define function with correct path (just to be safe)
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

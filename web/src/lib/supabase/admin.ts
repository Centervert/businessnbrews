import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with service role. Use in API routes after
 * verifying the request is authenticated (e.g. middleware or session check).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase admin env");
  return createClient(url, key);
}

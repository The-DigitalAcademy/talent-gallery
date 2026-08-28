import "server-only";

import { createClient } from "@/app/lib/supabase/server";

/**
 * Thrown when a Server Action is invoked without a valid admin session.
 *
 * Server Actions are reachable by POSTing a `Next-Action` header to ANY route,
 * which sidesteps the path-based `/admin` gate in `proxy.ts`. Every mutating
 * Server Action must therefore authorize on its own. This is that check.
 */
export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Assert that the caller has a valid, server-verified admin session.
 *
 * Uses `supabase.auth.getUser()` (NOT getSession/getClaims): getUser() re-checks
 * the JWT with the Supabase Auth server, so a forged/expired cookie is rejected.
 * The client is the cookie-bound server client, so this reflects the real caller.
 *
 * Admin model: today any authenticated Supabase user is treated as an admin
 * (login is Google OAuth via `signInWithOAuth`; there is no role/claim/allowlist
 * anywhere in the app -- `proxy.ts` only checks "is there a user"). So the DB /
 * app can only key on "authenticated". If you need to restrict WHICH Google
 * accounts count as admins, set ADMIN_ALLOWED_EMAILS to a comma-separated list;
 * when set, only those emails pass. When unset (the default), behaviour is
 * unchanged: any authenticated user is allowed.
 *
 * @throws {UnauthorizedError} when there is no valid session, or (when the
 *   allowlist is configured) the user's email is not on it.
 * @returns the verified Supabase user.
 */
export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new UnauthorizedError("Not authenticated");
  }

  const allowlist = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowlist.length > 0) {
    const email = user.email?.toLowerCase();
    if (!email || !allowlist.includes(email)) {
      throw new UnauthorizedError("Not an authorized admin");
    }
  }

  return user;
}

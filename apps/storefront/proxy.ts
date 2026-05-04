import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except API, Next internals, static files, and the
  // few public assets we don't want locale-prefixed.
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};

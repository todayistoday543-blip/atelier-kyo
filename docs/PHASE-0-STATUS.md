# Phase 0 — Status Snapshot

**Last updated:** 2026-05-05 (autonomous run while Kyoiskyo was sleeping)
**Branch:** `develop` (8 commits ahead of `main`)

---

## ✅ Completed

| # | Task | Commit / Output |
|---|---|---|
| T-01 | CLI tooling triage | gh skipped (Path C). supabase.exe (Windows side, v2.98.1) callable from WSL. |
| T-02 | git init + .gitignore + first commit | `9790733` |
| T-03 | GitHub repo `atelier-kyo` (private) | https://github.com/todayistoday543-blip/atelier-kyo |
| T-04 | First push + `develop` branch | GCM bridged from WSL2 → Windows credential manager (recurring future pushes work from Claude shell). |
| T-05 | Next.js 16 skeleton (`apps/storefront/`) | `0c4db0e`. Next 16.2.4 / React 19.2.4 / Tailwind v4 / TS 5.9 strict / Turbopack. |
| (—)  | Doc realignment to Next 16 + Cache Components | `0918684` |
| T-06 | Core runtime + dev deps | `dbf015d`. 15 packages: shopify, supabase, three / r3f / drei / postprocessing, gsap / motion / lenis, next-intl, zod, prettier (+plugin), @types/three. |
| T-07 | Vercel project link | `prj_seb1AYep2I3yH1yfMVgHwqMNuAnR` under `todayistoday543-gmailcoms-projects/atelier-kyo`. |
| T-10 | `.env.example` + `.env*` gitignore exception | `935a13f` |
| T-11 | `vercel.json` (hnd1) + `next.config.ts` (Cache Components, image hosts, strict mode) | `935a13f` |
| T-12 | GitHub Actions CI (lint / typecheck / build) | `a540d67`. Build job uses placeholder env vars so it passes before Vercel project envs are filled. |
| (—)  | Storefront `lib/shopify/`, `lib/supabase/`, `lib/utils.ts` scaffolds | `362a4ed` |
| (—)  | `supabase init` (local config only) | `362a4ed` |
| (—)  | `kyo-architect.md` setup commands aligned to pnpm | `3ed2f02` |
| T-13 | First Vercel deploy | https://atelier-kyo.vercel.app (HTTP 200, READY). **See caveat below.** |

### Build verification

- `pnpm typecheck` — 0 errors
- `pnpm lint` — 0 errors
- `pnpm build` — succeeds (4.5s compile, 7.2s static generation, "Cache Components enabled" confirmed)
- `vercel deploy` — succeeds (19s build / 30s deploy)

---

## ⚠️ Decisions made autonomously (please review)

1. **Next.js 15 → 16.** `pnpm create next-app@latest` pulled 16.2.4. Updated `CLAUDE.md`, `kyo-architect.md`, and `INITIAL_PROMPT.md` to reflect this. Cache Components replaces the older `unstable_cache` / PPR guidance. **Approved by Kyoiskyo before sleep.**
2. **First deploy went to `target: "production"`, not preview.** This is Vercel's default for the first deploy of a brand-new project. The deployed site is the empty Next.js skeleton, so there is no real exposure. We should decide the long-term flow: keep `develop` → preview, `main` → production, with promotion via `vercel deploy --prod` from CI.
3. **`gh` CLI deferred.** Path C means we manually created the repo via the GitHub web UI. `gh` is still nice-to-have for `gh pr` / `gh repo` ergonomics — recommend installing in WSL2 next session.
4. **`eslint-plugin-react-hooks-extra` dropped.** kyo-architect's standard recipe still listed it; eslint-config-next 16 already covers the same rules, so the package was removed from the recipe.
5. **CI uses placeholder env vars** (e.g. `example.myshopify.com`) so the build job passes before real Shopify / Supabase values are wired into Vercel project env. Real values should never go in `ci.yml`.
6. **`.env*` gitignore exception.** create-next-app's generated `.gitignore` blanket-ignored `.env*`, which would have hidden `.env.example`. Added `!.env.example` exception.
7. **Lazy env reads in `lib/shopify/client.ts`.** Errors throw on first call rather than at module load, so builds without real env still succeed. Same pattern is safe in `lib/supabase/`.

---

## ⏳ Pending — needs Kyoiskyo

### T-08 — Supabase remote link
1. In your interactive WSL2 terminal:
   ```bash
   supabase.exe projects list
   ```
   - If logged in, you'll see your projects.
   - If not, run `supabase.exe login` (browser auth).
2. Tell me the **project ref** for the Atelier Kyo project (from the dashboard URL `/dashboard/project/<ref>/`).
3. I'll then run:
   ```bash
   cd apps/storefront
   supabase.exe link --project-ref <ref>
   supabase.exe gen types typescript --linked > lib/supabase/types.ts
   ```

### T-09 — Shopify Partner template development store
1. https://partners.shopify.com → Stores → Add store → **Create development store**
   - Name: `Atelier Kyo Template` (or similar)
   - Purpose: "Build a new store for a client"
   - Build version: Latest
2. In the new store admin: Settings → Apps and sales channels → **Develop apps** → Create an app:
   - Configure Storefront API access
   - Scopes: `read_products`, `read_collections`, `read_inventory`, `read_content`, `read_customer_tags`
   - Install app → copy **Storefront access token**
3. Send me:
   - Store URL (`xxxxx.myshopify.com`) — safe to share
   - Storefront access token — **do NOT paste in chat**, instead set it directly in your `.env.local` and `vercel env add SHOPIFY_STOREFRONT_ACCESS_TOKEN`

### Vercel project env vars
Once Shopify and Supabase values exist, run from `apps/storefront/`:
```bash
vercel env add SHOPIFY_STORE_DOMAIN
vercel env add SHOPIFY_STOREFRONT_ACCESS_TOKEN
vercel env add SHOPIFY_REVALIDATION_SECRET
vercel env add SHOPIFY_API_VERSION       # value: 2026-01
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

---

## 🔭 Open questions for Kyoiskyo

1. **First deploy went to production.** Do you want me to (a) remove the `atelier-kyo.vercel.app` production alias and re-establish a preview-only flow, or (b) accept production-on-first-deploy and just gate future production deploys behind PR-merged-to-main?
2. **Workspace setup.** CLAUDE.md mentions `packages/design-tokens/` for Phase 2. Right now the repo is a single-app layout. Should we set up pnpm workspaces (root `pnpm-workspace.yaml` with `apps/*` and `packages/*`) at the start of Phase 2, or now?
3. **gh CLI install.** Recommend `sudo apt install gh` in your next interactive session so future `gh pr create` / `gh repo view` calls work from the Claude shell.
4. **Phase 1 trigger.** Once T-08 and T-09 are unblocked, kyo-scout can start the Yokohama / Kanagawa shop research. Want me to wait for explicit "start Phase 1" or auto-start once env is wired?

---

## 📍 Live identifiers

- **Repo:** https://github.com/todayistoday543-blip/atelier-kyo
- **Branches:** `main` (1 commit, just initial config), `develop` (8 commits, current head `3ed2f02`)
- **Vercel project:** `atelier-kyo` under `todayistoday543-gmailcoms-projects`
- **Vercel deployment:** https://atelier-kyo.vercel.app (production alias, READY)
- **Vercel project ID:** `prj_seb1AYep2I3yH1yfMVgHwqMNuAnR`
- **Latest deployment ID:** `dpl_2r4J3YsKWydoJih72WpZGs3zfVW3`
- **Inspector:** https://vercel.com/todayistoday543-gmailcoms-projects/atelier-kyo/2r4J3YsKWydoJih72WpZGs3zfVW3

---

## 🧱 What I did NOT touch

- `main` branch (no merge, no PR opened)
- Any production env / secrets
- `git push --force` or any destructive op
- Phase 1 scope (no scout research, no client work)
- `packages/design-tokens/` (not yet needed)
- `clients/[slug]/` (no clients yet)
- Three.js / R3F components (Phase 2 work, kyo-stylist domain)
- E2E tests / Lighthouse setup (Phase 2 work, kyo-mechanic domain)

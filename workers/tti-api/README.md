# tti-api — Cloudflare Worker backend

A standalone Cloudflare Worker that replaces the Next.js `/api/generate` route
for deployments that can't run a Node.js server — notably a Capacitor APK build.

The Worker holds the rotating pool of `POLL_KEY_*` secrets in its own
environment. They are never shipped inside an APK or browser bundle, so a
user can't decompile the APK and scrape the keys.

The request/response contract is identical to the Next.js `/api/generate`
route, so the web client can switch between the two by changing a single env
var (`NEXT_PUBLIC_API_BASE_URL`) at build time.

## When you need this

- You are building a Capacitor APK (`next build` with `output: "export"`,
  no Node server at runtime) and need a remote backend for generation.
- You want to deploy the API on Cloudflare's free tier and skip Vercel.

If you're just running the Next.js web app on Vercel / Railway / any
Node-capable host, you don't need this — the built-in `/api/generate`
route already does the same job.

## Prerequisites

1. A Cloudflare account (free tier is enough).
2. `wrangler` installed — already a devDep here, or install globally with
   `npm i -g wrangler`.
3. 10 Pollinations.ai pool tokens (one per account, same set as the existing
   `POLL_KEY_1..POLL_KEY_10` env vars on the Next.js app).
4. (Recommended) An Upstash Redis database for cross-instance daily counters.
   Without it, the Worker falls back to in-memory counters that reset on each
   isolate restart — OK for smoke tests, not for production quota enforcement.

## First-time setup

```bash
cd workers/tti-api
npm install
npx wrangler login                # one-time browser auth
```

Populate secrets. These are stored encrypted in Cloudflare and never appear in
`wrangler.toml` or this repo:

```bash
npx wrangler secret put POLL_KEY_1       # paste when prompted, repeat for 2..10
# ... up to POLL_KEY_10
npx wrangler secret put UPSTASH_REDIS_REST_URL
npx wrangler secret put UPSTASH_REDIS_REST_TOKEN
```

Edit `wrangler.toml` and replace the `ALLOWED_ORIGINS` placeholder with the
origins that should be allowed to call this Worker:

- The public domain of your web deployment (e.g. `https://tti.example.com`).
- `capacitor://localhost` (iOS WebView origin).
- `https://localhost` (Android WebView origin when `capacitor.config.ts` uses
  `androidScheme: "https"`, which is the default in recent Capacitor).
- `http://localhost` (only if you downgrade `androidScheme` to `http`).

Origins are matched exactly — no wildcards. Requests from origins not on
this list are rejected with `403 origin_not_allowed`.

## Deploy

```bash
npm run deploy
```

Wrangler prints the URL of the deployed Worker, e.g.
`https://tti-api.<your-subdomain>.workers.dev`. Save this — you need it for
the client build.

## Health check

```bash
curl https://tti-api.<subdomain>.workers.dev/health
# {"ok":true,"poolKeys":10,"redisConfigured":true}
```

`poolKeys` is the number of `POLL_KEY_*` secrets the Worker can see. If it's
less than 10, you missed some `wrangler secret put` calls.

## Pointing the web client at the Worker

Add to the build environment (Vercel env vars, `.env.local`, CI, etc.):

```
NEXT_PUBLIC_API_BASE_URL=https://tti-api.<your-subdomain>.workers.dev
```

`src/lib/api-base.ts` picks this up at build time. When unset, the client
calls same-origin `/api/generate` (the Next.js route) — so your existing
Vercel deployment keeps working unchanged.

## Building an APK with Capacitor

1. Add `output: "export"` to `next.config.ts` (a Capacitor-only build
   profile — keep the web build without it so the admin page and Next API
   routes keep working).
2. `NEXT_PUBLIC_API_BASE_URL=https://tti-api.<subdomain>.workers.dev npm run build`
3. `npx cap sync android`
4. Open the Android project in Android Studio (or `npx cap run android`) and
   produce a signed APK.

The resulting APK contains no Pollinations tokens. Decompiling it reveals
only the Worker URL, which is useless on its own because the Worker is
protected by:
- `ALLOWED_ORIGINS` allowlist (CORS).
- Per-device daily counter in Redis.
- Per-key daily pool limit.

Abuse mitigation is still imperfect (someone can run a fresh-device-id
replay attack), but significantly better than shipping the raw keys.

## Local development

`npx wrangler dev` starts the Worker at `http://localhost:8787` with hot
reload. You can point a local Next build at it:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8787 npm run dev   # from repo root
```

Make sure `http://localhost:3000` is in `ALLOWED_ORIGINS` for the dev check
to succeed (or run the Next dev server on whichever port matches).

## Observability

Cloudflare dashboard → Workers → `tti-api` → Logs shows live request logs.
The Worker emits structured errors from `upstream_error`, `pool_exhausted`,
etc. which show up as non-200 responses.

## Cost

Free plan: 100,000 requests/day, 10ms CPU per request, no bandwidth charges.
This Worker spends most of its wall-clock time waiting on the upstream
Pollinations response, which doesn't count against CPU time — so 100k free
requests/day is effectively the cap.

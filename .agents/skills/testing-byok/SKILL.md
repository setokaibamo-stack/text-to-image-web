# Testing the Pollinations BYOK flow

Use this skill when testing anything that touches the Pollinations API key (modal
validation in `/auth`, `/settings`, `KeyGuard` on `/dashboard`).

## Storage keys (use the constants, never hardcode)

- `localStorage["tti.pollinations.api_key"]` — the user's key (persists across reloads)
- `sessionStorage["tti.pollinations.validated"]` — `"1"` once the key has been validated this tab/session

Both are exported from `src/lib/pollinations.ts` as `POLLINATIONS_KEY_STORAGE`
and `POLLINATIONS_VALIDATED_FLAG`. Any code referencing them must import the
constants — Devin Review will flag hardcoded strings.

## Seed pattern — avoid burning real keys

In the browser DevTools console:

```js
localStorage.setItem('tti.pollinations.api_key','poll_TEST_abcdef1234');
sessionStorage.setItem('tti.pollinations.validated','1');
```

Then navigate to `/dashboard` or `/settings`. The Settings page will render
`••••••••1234` (last 4 chars). If you set `validated="1"`, KeyGuard skips its
network re-check, which keeps tests fast and deterministic.

To simulate a fresh tab where KeyGuard would re-check:

```js
sessionStorage.removeItem('tti.pollinations.validated');
```

## Pollinations server quirk — bogus tokens still return 200

**Important**: As of testing on 2026-04-26, `https://image.pollinations.ai/prompt/...?token=zzzzzzz`
returns **HTTP 200 even for clearly invalid tokens** — Pollinations falls back
to public quota when the token is unrecognized. This means the modal's
`onPollinationsSubmit` rejection error path **cannot be exercised by simply
typing a fake token** in the modal. The validator will succeed and route to
`/dashboard`.

### How to actually test the rejection UI

Two options:

1. **Simulate the post-redirect URL directly** — visit `/en/auth?keyInvalid=1`
   in a fresh tab. The amber banner from `auth-form.tsx` should render with
   text "Your saved Pollinations key was rejected. Please re-enter it." This
   verifies the rejection-banner code path even when the live network can't
   produce a 401.
2. **Mock the network response** — intercept the `image.pollinations.ai`
   request in DevTools → Network → "Block request URL" or use a Playwright
   route mock to return 401. The modal will then show "That key was rejected
   by Pollinations.ai…" and the URL will stay on `/auth`.

When reporting test results for the BYOK reject path, mark T1 ("reject bogus
key") as **untested** with this server-quirk note rather than claiming pass
or fail. The code is correct; the validator endpoint just isn't strict enough
at signup time. KeyGuard will still catch a key that becomes invalid later if
Pollinations ever does return 401.

### Recommendation if stricter validation is needed

Switch the validator in `src/lib/pollinations.ts` to a Pollinations endpoint
that actually 401s on bad tokens (e.g. an `auth/me`-style endpoint when/if
they expose one), or call a paid-tier model whose endpoint rejects unknown
tokens.

## Drawer behavior — quick mental map

| Route | Header mode | Drawer items |
|---|---|---|
| `/` (locale root, marketing) | `marketing` | No drawer at all — header has locale chip + Sign-in CTA inline |
| `/dashboard`, `/settings` | `app` | Hamburger drawer with: locale switch + Settings + Sign out |
| `/launch`, `/welcome`, `/auth` | (no header) | Chromeless |

If you ever see `Settings`/`Sign out` showing on the marketing header (or vice
versa), the route classifier in `header.tsx` is wrong.

## Devin Secrets Needed

None — testing this flow is purely browser/localStorage based. No real
Pollinations API key needs to be saved as a Devin secret because the validator
accepts any non-empty string.

## Useful commands

```bash
# Verify the deployed commit on prod
curl -sI "https://text-to-image-web-beta.vercel.app/en/settings"

# Trigger a fresh Vercel prod deploy after pushing to main
VERCEL_TOKEN=$VERCEL_TOKEN npx vercel deploy --prod --yes
```

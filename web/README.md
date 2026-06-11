# EngageVision Web App

The `web/` folder contains the Next.js frontend for the Soft Computing final project. It lets users upload an image, sends that image to the FastAPI AI engine, and displays the resulting engagement classification.

## Main Responsibilities

- render the upload and preview interface
- forward image uploads through the app's API route
- display the CNN prediction, FIS score, and final label
- provide reusable authentication and API helper utilities from the base template

## Key Paths

- `src/app/page.tsx` - main landing page
- `src/components/engagement/` - upload, preview, and results UI
- `src/app/api/engagement/predict/route.ts` - server route that proxies uploads to the AI engine
- `src/lib/auth/` - Better Auth setup and helpers
- `src/lib/api-helper/` - API wrapper, JSend helpers, and API error utilities

## AI Engine Connection

The frontend expects the AI engine to expose `POST /predict`.

It reads the backend base URL from:

- `AI_ENGINE_URL`
- `NEXT_PUBLIC_AI_ENGINE_URL`

If neither is set, it falls back to:

```text
http://localhost:8000
```

## Authentication And API Helpers

This app still includes the reusable full-stack template helpers:

- `AuthPageHelper.requireUser()` for protected server pages
- `withApiPublic(...)` for public API routes
- `withApiAuth(...)` for authenticated API routes
- `jsend` and `ApiError` for consistent API responses

Example helper sources:

- `src/lib/auth/auth-page-helper.ts`
- `src/lib/auth/auth-api-helper.ts`
- `src/lib/api-helper/api-wrapper.ts`
- `src/lib/api-helper/jsend.ts`
- `src/lib/api-helper/error.ts`

## Related Docs

- [Root project overview](../README.md)
- [AI engine README](../ai_engine/README.md)

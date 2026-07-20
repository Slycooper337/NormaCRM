# NormaCRM

NormaCRM is Scope Creep's film-financing relationship manager. It organizes
production, packaging, finance, sales, investment, legal, tax-credit, lab, and
film-market contacts into a searchable lead database and a left-to-right
pipeline workspace.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included

- Lead database with company-level records and named contacts
- Pipeline workspace with draggable status stages
- Editable contact action logs with event details and timestamps
- Persistent storage through the app's D1-backed API when hosted
- Louisiana-first and global industry lead data

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Local development

Install dependencies, then run the local app:

```bash
npm install
npm run dev
```

The production build can be checked with `npm run build`.

## Learn More

The live hosted build is available at:

https://norma-financing-crm.taylorcooper337.chatgpt.site

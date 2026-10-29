# TypeScript – Mastra

Setup: [SETUP.md](SETUP.md)

| Session | File                  | What's new                        |
| ------- | --------------------- | --------------------------------- |
| 1       | `session-01/agent.ts` | a single agent call, nothing else |

Run, from the `typescript/` folder:

```bash
npx tsx --env-file=.env session-01/agent.ts
```

## Versions

Agents run code from packages you did not write. Attacks through compromised
npm packages happen regularly, so this project pins what it installs and from
where. Worth knowing for your own projects too.

| Package      | Version | Published  |
| ------------ | ------- | ---------- |
| @mastra/core | 1.78.0  | 2026-10-15 |
| zod          | 4.6.7   | 2026-10-12 |
| tsx          | 4.23.15 | 2026-09-20 |
| @types/node  | 24.19.2 | –          |

Pinned exactly, all published via Trusted Publishing with provenance – except
`@types/node`: it comes from Microsoft's official account for TypeScript types,
without provenance, but signed and without install scripts.
`.npmrc` applies to all dependencies, including transitive ones:

- **7-day cooldown** (`min-release-age=7`, requires npm ≥ 11.10)
- **no install scripts** (`ignore-scripts=true`)

The package manager is pinned in `package.json` under `devEngines`: npm 11.10
or newer on Node 24.22.1 or newer. Older versions make npm abort.

`package-lock.json` records every version; install with `npm ci`.

To update: change the version in `package.json`, run `npm install`, review the
changes in `package-lock.json`, then run `npm audit signatures`.

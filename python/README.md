# Python – Pydantic AI

Setup: [SETUP.md](SETUP.md)

| Session | File                  | What's new                        |
| ------- | --------------------- | --------------------------------- |
| 1       | `session-01/agent.py` | a single agent call, nothing else |

Run, from the `python/` folder:

```bash
uv run --env-file .env session-01/agent.py
```

## Versions

Agents run code from packages you did not write. Attacks through compromised
PyPI packages happen regularly, so this project pins what it installs and from
where. Worth knowing for your own projects too.

| Package                     | Version | Published  |
| --------------------------- | ------- | ---------- |
| pydantic-ai-slim[anthropic] | 2.57.0  | 2026-10-16 |
| anthropic                   | 1.17.0  | 2026-10-20 |

Pinned exactly, published via Trusted Publishing with provenance.
`anthropic` is pinned on its own because version 2.x of the SDK broke
pydantic-ai 2.57.0, and pydantic-ai does not set an upper bound. A cooldown
does not catch that: the lockfile does.
A 7-day cooldown applies to all dependencies, including transitive ones
(`exclude-newer` in `pyproject.toml`). `uv.lock` records every version;
install with `uv sync --locked`.

To update: change the version in `pyproject.toml`, run `uv lock`, review the
changes in `uv.lock`.

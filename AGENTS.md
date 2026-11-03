# AGENTS.md - soschain-info

## Rules entry point

Read [`docs/RULES_INDEX.md`](docs/RULES_INDEX.md) before changing this
repository. It links the repository-owned product, testing and publication
contracts. If two linked rules conflict, stop and reconcile their owning files
instead of choosing one silently.

## Scope

This repository owns the static bilingual public SOSChain information site and
its public information materials. It does not own portal behavior, gateway
policy, clinical authority, provider-index authority or deployment
infrastructure.

## Required gates

- Preserve English and Spanish content and navigation together.
- Keep credentials in ignored local configuration; never commit secret values
  or operational evidence.
- Write the smallest failing contract test before changing behavior and keep
  the `Flow contract:` comment as the first line of every new or modified test.
- Run `npm test` before commit, merge or push.
- Deploy only when explicitly requested, using the atomic `npm run deploy`
  procedure documented in `README.md`; a passing test or merge is not a
  deployment.
- Work on a branch, merge explicitly into `main`, push `main`, verify matching
  refs and finish with a clean worktree.


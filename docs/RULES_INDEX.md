# Repository rules index

This page is the navigation entry point for the rules owned by this public
repository. It contains no credentials or private infrastructure references.

## Repository governance

- [`AGENTS.md`](../AGENTS.md) defines scope, required gates and release closure.
- [`README.md`](../README.md) defines the supported local preview, public site
  behavior, test command and atomic publication procedure.
- [`.gitignore`](../.gitignore) defines local credential and generated-artifact
  exclusions.

## Executable contracts

- [`tests/site-content.test.mjs`](../tests/site-content.test.mjs) protects the
  bilingual content, public claims, branding, navigation and published assets.
- [`tests/deploy-ftps.test.mjs`](../tests/deploy-ftps.test.mjs) protects
  credential locality and the verified temporary-upload-and-rename publication
  sequence.
- [`tests/rules-links.test.mjs`](../tests/rules-links.test.mjs) fails when this
  rules graph loses a repository-owned target or acquires a private workspace
  dependency.
- [`scripts/deploy-ftps.sh`](../scripts/deploy-ftps.sh) is the canonical atomic
  publication implementation; it is not run by the documentation gate.

The index links only repository-owned public contracts. Operational authority
that is not represented by one of these files must not be inferred here.


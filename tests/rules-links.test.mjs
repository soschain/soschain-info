// Flow contract: the public repository governance entry point links only existing repository-owned rules and never depends on private workspace paths.
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function markdownTargets(markdown) {
  return [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map(([, target]) => target)
    .filter(target => !/^(?:https?:|mailto:|#)/.test(target));
}

test('keeps the public rules entry point complete and locally resolvable', async () => {
  const agentsPath = resolve(repositoryRoot, 'AGENTS.md');
  const agents = await readFile(agentsPath, 'utf8');
  const rulesIndexPath = resolve(repositoryRoot, 'docs/RULES_INDEX.md');
  const rulesIndex = await readFile(rulesIndexPath, 'utf8');

  assert.match(agents, /docs\/RULES_INDEX\.md/);
  assert.match(rulesIndex, /README\.md/);
  assert.match(rulesIndex, /deploy-ftps\.test\.mjs/);
  assert.match(rulesIndex, /site-content\.test\.mjs/);
  assert.doesNotMatch(`${agents}\n${rulesIndex}`, /Users\/|connectech-operations-private/i);

  for (const [filePath, markdown] of [[agentsPath, agents], [rulesIndexPath, rulesIndex]]) {
    for (const target of markdownTargets(markdown)) {
      const pathOnly = target.split('#', 1)[0];
      if (pathOnly) await access(resolve(dirname(filePath), pathOnly));
    }
  }
});

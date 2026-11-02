// Flow contract: every FTPS publication uploads and verifies a temporary file before atomically replacing the public file, so the previous site remains available throughout the update.
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);
const deployScriptUrl = new URL('../scripts/deploy-ftps.sh', import.meta.url);
const deployScript = await readFile(deployScriptUrl, 'utf8').catch(() => '');

test('publishes each file through a verified temporary upload and FTP rename', async () => {
  assert.match(deployScript, /temp_path=.*\.upload-/);
  assert.match(deployScript, /--upload-file "\$file" "\$\{base_url\}\$\{temp_path\}"/);
  assert.match(deployScript, /remote_hash=.*shasum -a 256/);
  assert.match(deployScript, /RNFR \$\{temp_path\}/);
  assert.match(deployScript, /RNTO \$\{target_path\}/);
  assert.doesNotMatch(deployScript, /--upload-file "\$file" "\$\{base_url\}\$\{target_path\}"/);
  await execFileAsync('bash', ['-n', deployScriptUrl.pathname]);
});

test('keeps hosting credentials local and exposes one canonical deploy command', async () => {
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  assert.equal(packageJson.scripts.deploy, 'bash scripts/deploy-ftps.sh');
  assert.match(deployScript, /source "\$env_file"/);
  assert.match(readme, /npm run deploy/);
  assert.match(readme, /at[oó]mic/i);
});

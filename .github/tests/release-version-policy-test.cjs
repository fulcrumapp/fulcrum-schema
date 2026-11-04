const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

const workflows = path.resolve(__dirname, "../workflows");
const workflow = readFileSync(path.join(workflows, "ci.yml"), "utf8");
const buildJob = workflow.match(/^  ci:\n([\s\S]*?)(?=^  build-and-test:)/m)?.[1];
assert.ok(buildJob, "ci job is present");
const guard = buildJob.match(/node <<'NODE'\n([\s\S]*?)^\s*NODE$/m)?.[1];
assert.ok(guard, "version guard is present");

test("release tagging uses the public CI App secrets", () => {
  assert.match(workflow, /app-id:\s*\$\{\{\s*secrets\.FULCRUM_CI_APP_ID_PUBLIC\s*\}\}/);
  assert.match(workflow, /private-key:\s*\$\{\{\s*secrets\.FULCRUM_CI_APP_PRIVATE_KEY_PUBLIC\s*\}\}/);
  assert.doesNotMatch(workflow, /secrets\.FULCRUM_CI_APP_(?:ID|PRIVATE_KEY)\s*\}\}/);
});

function runCheck(base, head, sha = "a".repeat(40)) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "version-policy-"));
  try {
    if (base !== null) writeFileSync(path.join(dir, "base"), base);
    if (head !== null) writeFileSync(path.join(dir, "head"), head);
    writeFileSync(path.join(dir, "git"), `#!/bin/sh
case "$2" in
  HEAD:package.json) cat "$FIXTURES/head" ;;
  *:package.json) cat "$FIXTURES/base" ;;
  *) exit 1 ;;
esac
`, { mode: 0o755 });
    return spawnSync(process.execPath, ["-e", guard], {
      encoding: "utf8",
      env: { ...process.env, PATH: `${dir}:${process.env.PATH}`, FIXTURES: dir, BASE_SHA: sha }
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("event bases, checkout and GitHub-hosted runners are configured", () => {
  for (const field of ["pull_request.base.sha", "merge_group.base_sha", "event.before"]) {
    assert.ok(buildJob.includes(field), field);
  }
  assert.match(buildJob, /fetch-depth:\s*0/);
  assert.match(buildJob, /runs-on:\s*ubuntu-latest/);
  assert.match(workflow, /^  tag:[\s\S]*?runs-on:\s*ubuntu-latest/m);
  assert.match(workflow, /node --test \.github\/tests\/\*\.cjs/);
});

test("all workflow jobs use GitHub-hosted Ubuntu runners", () => {
  for (const name of readdirSync(workflows).filter((file) => /\.ya?ml$/.test(file))) {
    const contents = readFileSync(path.join(workflows, name), "utf8");
    for (const line of contents.match(/^\s+runs-on:.*$/gm) || []) {
      assert.match(line, /^\s+runs-on:\s*ubuntu-latest\s*$/, `${name}: ${line}`);
    }
  }
});

test("the version guard accepts unchanged versions and rejects invalid changes", () => {
  const original = '{"version":"1.2.3","dependencies":{"a":"1"}}';
  const cases = [
    [original, original, true],
    [original, '{"version":"1.2.3","dependencies":{"a":"2"}}', true],
    [original, '{"version":"1.2.4"}', false],
    [original, null, false],
    [null, original, false],
    [original, "{", false],
    [original, "{}", false],
    [original, '{"version":""}', false]
  ];
  for (const [base, head, expected] of cases) {
    const result = runCheck(base, head);
    assert.equal(result.status === 0, expected, result.stderr);
    if (head === '{"version":"1.2.4"}') assert.match(result.stderr, /Do not manually change/);
  }
  const missingBase = runCheck(original, original, "0".repeat(40));
  assert.notEqual(missingBase.status, 0);
  assert.match(missingBase.stderr, /base/);
});

test("publish workflows use tag creation and appropriate runners", () => {
  for (const name of ["publish"]) {
    const publish = readFileSync(path.join(workflows, `${name}.yml`), "utf8");
    assert.match(publish, /^  create:/m);
    assert.doesNotMatch(publish, /^  push:/m);
    assert.match(publish, /github\.ref_type == 'tag'/);
    assert.match(publish, /^  publish:[\s\S]*?runs-on:\s*ubuntu-latest/m);
    assert.match(publish, /^  release:[\s\S]*?runs-on:\s*ubuntu-latest/m);
  }
});

test("GitHub Packages publishing installs npm 11 before packing without scripts", () => {
  const action = readFileSync(path.join(__dirname, "../actions/npm-publish-github/action.yml"), "utf8");
  const install = action.indexOf("npm install --global npm@11.5.1 --ignore-scripts");
  const pack = action.indexOf("npm pack ./dist --ignore-scripts --json");
  assert.ok(install >= 0 && pack > install, "npm 11 must be installed before packing");
});

test("Corepack cannot rewrite package.json during CI or package publishing", () => {
  const action = readFileSync(path.join(__dirname, "../actions/npm-publish-github/action.yml"), "utf8");
  assert.match(buildJob, /^\s{4}env:\n\s{6}COREPACK_ENABLE_AUTO_PIN:\s*['"]0['"]/m);
  for (const step of ["Enable the configured Yarn version", "Install dependencies", "Build package"]) {
    const section = action.split(`    - name: ${step}\n`)[1]?.split("\n    - name: ")[0];
    assert.ok(section, `${step} exists`);
    assert.match(section, /^\s{8}COREPACK_ENABLE_AUTO_PIN:\s*['"]0['"]/m, step);
  }
  const dir = mkdtempSync(path.join(os.tmpdir(), "corepack-manifest-"));
  const manifest = '{"name":"corepack-test","version":"1.0.0"}\n';
  try {
    writeFileSync(path.join(dir, "package.json"), manifest);
    const result = spawnSync("corepack", ["yarn", "--version"], {
      cwd: dir,
      encoding: "utf8",
      env: { ...process.env, COREPACK_ENABLE_AUTO_PIN: "0" }
    });
    assert.equal(result.status, 0, result.error?.message || result.stderr);
    assert.equal(readFileSync(path.join(dir, "package.json"), "utf8"), manifest);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

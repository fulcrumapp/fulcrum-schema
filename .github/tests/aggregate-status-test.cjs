"use strict";

const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const workflows = path.resolve(__dirname, "../workflows");
const workflow = readFileSync(path.join(workflows, "ci.yml"), "utf8");
const aggregate = workflow.match(/^  build-and-test:\n([\s\S]*?)(?=^  tag:)/m)?.[1];
assert.ok(aggregate, "required build-and-test job is present");
const script = aggregate.match(/        run: \|\n([\s\S]*)/)?.[1]?.replace(/^          /gm, "");
assert.ok(script, "aggregate job has a result check");
function run(result) {
  return spawnSync("bash", ["-e", "-o", "pipefail", "-c", script], {
    encoding: "utf8", env: { ...process.env, CI_RESULT: result }
  });
}

test("the required check and tag depend on successful validation", () => {
  assert.match(aggregate, /always\(\)/);
  assert.match(aggregate, /^\s+needs: ci$/m);
  assert.match(aggregate, /CI_RESULT:\s*\$\{\{\s*needs\.ci\.result\s*\}\}/);
  assert.match(workflow, /^  tag:[\s\S]*?needs: build-and-test/m);
  assert.doesNotMatch(workflow, /^  sonar:/m);
  assert.doesNotMatch(workflow, /secrets\.ACTIONS_SONAR_/);
  assert.equal(run("success").status, 0);
  for (const result of ["failure", "skipped", "cancelled", ""]) {
    assert.notEqual(run(result).status, 0, result);
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import { resolve } from "node:path";
import { platformRoot } from "../src/paths.mjs";
import { validateStandards } from "../src/standards-validator.mjs";

test("validates the routed standards package", async () => {
  const result = await validateStandards(resolve(platformRoot, "standards"));
  assert.equal(result.version, "0.3.0");
  assert.equal(result.runtimeDocuments, 7);
  assert.equal(result.provenanceDocuments, 1);
});

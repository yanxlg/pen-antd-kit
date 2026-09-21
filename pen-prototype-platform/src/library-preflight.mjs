import { resolve } from "node:path";
import { pathExists, readJson, sha256 } from "./io.mjs";

const knownImportCapabilities = new Set([
  "library.import",
  "library.register",
  "import_library",
  "register_library",
]);

function flattenCapabilityNames(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.flatMap((entry) => typeof entry === "string" ? [entry] : [entry?.name, entry?.id].filter(Boolean));
  }
  if (Array.isArray(value.tools)) return flattenCapabilityNames(value.tools);
  return Object.keys(value);
}

export async function prepareLibrary({ kitRoot, capabilitiesFile }) {
  const releasePath = resolve(kitRoot, "release.json");
  const release = await pathExists(releasePath)
    ? await readJson(releasePath)
    : { schemaVersion: 1, kitVersion: "development", library: { id: "antd-6", path: "libraries/antd-6.lib.pen" } };
  const relativePath = release.library?.path || "libraries/antd-6.lib.pen";
  const libraryPath = resolve(kitRoot, relativePath);
  if (!(await pathExists(libraryPath))) throw new Error(`Library file is missing: ${libraryPath}`);
  const digest = await sha256(libraryPath);
  if (release.library?.sha256 && release.library.sha256 !== digest) {
    throw new Error(`Library checksum mismatch: expected ${release.library.sha256}, received ${digest}`);
  }

  let capabilityNames = [];
  if (capabilitiesFile) capabilityNames = flattenCapabilityNames(await readJson(capabilitiesFile));
  const importCapability = capabilityNames.find((name) => knownImportCapabilities.has(name));
  const automaticImportSupported = Boolean(importCapability);

  return {
    stage: "before-prototype-generation",
    kitVersion: release.kitVersion,
    library: {
      id: release.library?.id || "antd-6",
      path: libraryPath,
      sha256: digest,
    },
    import: automaticImportSupported
      ? {
          strategy: "pen-mcp",
          automaticImportSupported: true,
          capability: importCapability,
          nextAction: "Invoke the reported Pen library import capability, then verify the library id and digest before creating nodes.",
        }
      : {
          strategy: "manual-pen-ui",
          automaticImportSupported: false,
          manualActionRequired: true,
          reason: "The reported Pen MCP capability set has no library import or registration operation.",
          nextAction: "Import this file once from Pen Libraries, then rerun the generation preflight and verify the library id before creating nodes.",
        },
  };
}

import fs from "fs";

const pen = JSON.parse(fs.readFileSync("libraries/antd-6.lib.pen", "utf8"));

function findNode(nodes, id) {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const res = findNode(n.children, id);
      if (res) return res;
    }
  }
  return null;
}

const origin = findNode(pen.children, "antd-button-live-origin");
const cards = [
  "ecSyZ", "amPdg", "B66IeN", "dYwZb", "v4Pii3",
  "S9apJ", "RbSSB", "XK6gC", "a0YriD", "YQZdm",
  "DVEtn", "p9ga4", "ema6A", "CodtW", "nFhIx"
];

const cardUpdates = [];
for (const cid of cards) {
  const cNode = findNode(pen.children, cid);
  if (cNode) {
    cardUpdates.push({
      cardId: cid,
      previewNode: cNode.children[0]
    });
  }
}

// Generate chunks of execute code
fs.writeFileSync("scratch/card_updates.json", JSON.stringify({
  originInputs: origin.inputs,
  cardUpdates: cardUpdates
}, null, 2));

console.log("Exported card updates JSON!");

import { NodeIO } from '@gltf-transform/core';

const io = new NodeIO();
const doc = await io.read(process.argv[2]);

const materials = doc.getRoot().listMaterials();
for (const mat of materials) {
  mat.setBaseColorFactor([0.58, 0.59, 0.62, 1]);
  mat.setMetallicFactor(0.9);
  mat.setRoughnessFactor(0.15);
}

await io.write(process.argv[3], doc);
console.log(`Baked material into ${materials.length} material(s), wrote ${process.argv[3]}`);

import { NodeIO } from '@gltf-transform/core';

const [, , inputPath, outputPath] = process.argv;

const io = new NodeIO();
const doc = await io.read(inputPath);

const mesh = doc.getRoot().listMeshes()[0];
const prim = mesh.listPrimitives()[0];
const normalAccessor = prim.getAttribute('NORMAL');
const positionAccessor = prim.getAttribute('POSITION');
const indexAccessor = prim.getIndices();

const normals = normalAccessor.getArray();
const indices = indexAccessor.getArray();
const triCount = indices.length / 3;

const frontIdx = [];
const backIdx = [];

for (let t = 0; t < triCount; t++) {
  const i0 = indices[t * 3];
  const i1 = indices[t * 3 + 1];
  const i2 = indices[t * 3 + 2];

  let ny = 0;
  for (const idx of [i0, i1, i2]) ny += normals[idx * 3 + 1];
  ny /= 3;

  if (ny < -0.7) {
    backIdx.push(i0, i1, i2);
  } else {
    frontIdx.push(i0, i1, i2);
  }
}

console.log(`Front triangles: ${frontIdx.length / 3}, back triangles: ${backIdx.length / 3}`);

const frontIndexAccessor = doc
  .createAccessor('front-indices')
  .setArray(new Uint32Array(frontIdx))
  .setType('SCALAR');
const backIndexAccessor = doc
  .createAccessor('back-indices')
  .setArray(new Uint32Array(backIdx))
  .setType('SCALAR');

prim.setIndices(frontIndexAccessor);
indexAccessor.dispose();

const darkMat = doc
  .createMaterial('back-material')
  .setBaseColorFactor([0.045, 0.045, 0.05, 1])
  .setMetallicFactor(0.7)
  .setRoughnessFactor(0.35);

const backPrim = doc
  .createPrimitive()
  .setAttribute('POSITION', positionAccessor)
  .setAttribute('NORMAL', normalAccessor)
  .setIndices(backIndexAccessor)
  .setMaterial(darkMat);

mesh.addPrimitive(backPrim);

await io.write(outputPath, doc);
console.log(`Wrote ${outputPath}`);

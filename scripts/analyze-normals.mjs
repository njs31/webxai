import { NodeIO } from '@gltf-transform/core';

const io = new NodeIO();
const doc = await io.read(process.argv[2]);

const mesh = doc.getRoot().listMeshes()[0];
const prim = mesh.listPrimitives()[0];
const normalAccessor = prim.getAttribute('NORMAL');
const indexAccessor = prim.getIndices();

const normals = normalAccessor.getArray();
const indices = indexAccessor.getArray();
const triCount = indices.length / 3;

const axisCounts = { x: 0, y: 0, z: 0 };
const axisSignCounts = {
  x: { pos: 0, neg: 0 },
  y: { pos: 0, neg: 0 },
  z: { pos: 0, neg: 0 },
};

for (let t = 0; t < triCount; t++) {
  const i0 = indices[t * 3];
  const i1 = indices[t * 3 + 1];
  const i2 = indices[t * 3 + 2];

  let nx = 0;
  let ny = 0;
  let nz = 0;
  for (const idx of [i0, i1, i2]) {
    nx += normals[idx * 3];
    ny += normals[idx * 3 + 1];
    nz += normals[idx * 3 + 2];
  }
  nx /= 3;
  ny /= 3;
  nz /= 3;

  const absX = Math.abs(nx);
  const absY = Math.abs(ny);
  const absZ = Math.abs(nz);

  if (absX > 0.7) {
    axisCounts.x++;
    axisSignCounts.x[nx > 0 ? 'pos' : 'neg']++;
  }
  if (absY > 0.7) {
    axisCounts.y++;
    axisSignCounts.y[ny > 0 ? 'pos' : 'neg']++;
  }
  if (absZ > 0.7) {
    axisCounts.z++;
    axisSignCounts.z[nz > 0 ? 'pos' : 'neg']++;
  }
}

console.log('Triangle count:', triCount);
console.log('Axis counts (|component| > 0.7):', axisCounts);
console.log('Sign breakdown:', axisSignCounts);


import prisma from './src/lib/prisma.js';
async function run() {
  const t = await prisma.tracking.findMany();
  console.log(JSON.stringify(t, null, 2));
}
run();


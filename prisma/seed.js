import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando carga de datos...");

  const exercise = await prisma.exercise.create({
    data: {
      nombre: "Sentadilla con barra",
      grupoMuscularPrincipal: "Piernas",
      gruposSecundarios: ["Glúteos", "Core"],
    },
  });

  console.log("Ejercicio creado:", exercise);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
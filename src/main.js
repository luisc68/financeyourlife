import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newcuenta = await prisma.RegistroCuentaBancaria.create({
    data: {
        nombre        : "Cuenta de Ahorros de Aguinaldo",
        numeroCuenta  : "CR1234567891011121314",
        banco         :"Banco Nacional",
        tipoCuenta    :"Cuenta de Ahorros",
        saldo         :598000,
        tipoMoneda    :"Colones"

      
    },
  });
  console.log("Nuevo cuenta agregada: ", newcuenta);
  const todoscuentas = await prisma.RegistroCuentaBancaria.findMany();
  console.log("Todos las cuentas que hay son: ");
  console.dir(todoscuentas, { depth: null });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
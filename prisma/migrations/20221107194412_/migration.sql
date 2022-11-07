-- CreateTable
CREATE TABLE "RegistroCuentaBancaria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numeroCuenta" TEXT NOT NULL,
    "banco" TEXT NOT NULL,
    "tipoCuenta" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "tipoMoneda" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroCuentaBancaria_pkey" PRIMARY KEY ("id")
);

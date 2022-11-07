// #1
import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
//#2
const prisma = new PrismaClient();
//#3
const app = express();

//#4
app.use(express.json());
app.use(morgan("tiny"));
//USUARIO
//Post Usuario
app.post("/usuario", async (req, res) => {
    const { email, name, password } = req.body;
    const newUsuario = await prisma.User.create({
        data: {
            email,
            name,
            password,

        },
    });
    res.json(newUsuario);
});
//Get Usuario
app.get("/usuario", async (req, res) => {
    const allUsuarios = await prisma.User.findMany();
    res.json(allUsuarios);
});
//Get Usuario by ID
app.get("/usuario/:id", async (req, res) => {
    const { id } = req.params;
    const usuario = await prisma.User.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(usuario);
});

            
//CUENTA BANCARIA
//Post para registrar una cuenta bancaria
app.post("/cuentas", async (req, res) => {
    const newcuentas = await prisma.RegistroCuentaBancaria.create({
        data: req.body,
    });
    console.log("Nueva cuenta agregada: ", newcuentas);
    res.json(newcuentas);
});

//Get para consultar todas las cuentas bancarias
app.get("/cuentas", async (req, res) => {
    const cuentasnew = await prisma.RegistroCuentaBancaria.findMany({include:{User:true}});
    res.json({
        success: true,
        data: cuentasnew,
        message: "Operation Successfuld",
    });
})

//Get para consultar una cuenta bancaria por su id  
app.get("/cuentas/:id", async (req, res) => {
    const { id } = req.params;
    const cuentasnew = await prisma.RegistroCuentaBancaria.findUnique({include: { User: true},
        where: {
            id: Number(id),
        },
    });
    res.json({
        success: true,
        data: cuentasnew,
        message: "Operation Successfuld",
    });
})


//Delete para eliminar una cuenta bancaria
app.delete("/cuentas/:id", async (req, res) => {
    const { id } = req.params;
    const cuentas = await prisma.RegistroCuentaBancaria.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(cuentas);
});

//FINAL
app.use((req, res, next) => {
    res.status(404);
    return res.json({
      success: false,
      payload: null,
      message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});
  
  app.listen(process.env.PORT || 8000, () =>
    console.log(`🚀 Example app listening on port 8000`)
);
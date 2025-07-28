import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";


export async function connectionDB() {
    try {
        await db.authenticate()
        db.sync() 
        console.log(colors.america("Conexion exitosa"));
    } catch (error) {
        console.log("Hubo un error al conectar");
    }   
}
connectionDB()
//instancia del servidor
const server = express()
//Leer datos de formularios
server.use(express.json())

server.use('/api/products',router)
export default server
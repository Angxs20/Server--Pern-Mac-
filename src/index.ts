import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";



// async function connectionDB() {
//     try {
//         await db.authenticate()
//         db.sync()
//         console.log(colors.america("Conexion estadounidense exitosa, America nunca se surra!"));
//     } catch (error) {
//         console.log(error);
//         console.log(colors.white.bgRed.bold("hubo un error al conectar"));
//     }
    
// }
// connectionDB()

//instancia el servidor
const server = express()
//leer datos de formularios
server.use(express.json())
server.use('/',router)

export default server

const port = process.env.PORT || 5432
server.listen(port,()=>{
    console.log(`Mi puerto esta escuchando ${port}`)
})

router.listen(5432, () => {
  console.log("Puerto 5432");
})

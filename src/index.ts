import server from "./server"


const port = process.env.PORT || 5432
server.listen(port, ()=>{
console.log(`Mi puerto esta escuchando en el puerto : ${port}`)
})

//server.test.ts
//configuracion de supertest
//manejar todas las pruebas en una carpeta
//__test__
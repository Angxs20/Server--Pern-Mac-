import { exit } from "node:process";
import db from "../config/db";
import { clear } from "node:console";

const clearDb = async () => {
    try {
        await db.sync({force: true})
        console.log('datos eliminados')
        exit(0)
    } catch (error){
        console.log(error)
        exit(1)
    }

}

if(process.argv[2] === '--clear'){
    clearDb()
}
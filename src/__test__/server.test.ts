import request from "supertest"
import server from "../server"
import db from "../config/db"
import { connectionDB } from "../server"
jest.mock("../config/db")


describe('connect to DB', ()=> {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
        .mockRejectedValueOnce(new Error("Hubo un error al conectar"))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectionDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Hubo un error al conectar")
        )
    })
})
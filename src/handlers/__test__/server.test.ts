import request from "supertest"
import server from "../../server"

describe('mi primer prueba de ts',()=>{
    it('1+1 must give 2', ()=>{
        expect(1+1).toBe(2)
        expect(1+1).not.toBe(3)
    }
    )
})
describe('Get /', ()=>{
    it('shoul send back a json response',async ()=>{
        const res = await request(server).get('/api/products')
        console.log(res);
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        //contrarias
        expect(res.status).not.toBe(400)
    })
})
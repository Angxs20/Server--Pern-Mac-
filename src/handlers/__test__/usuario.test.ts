// usuario.test.ts
const request = require('supertest');
import server from '../../server';
import User from '../../models/Usuario.mo';

describe('POST /api/users', () => {
  it('debe retornar 400 si el cuerpo está vacío', async () => {
    const res = await request(server).post('/api/users').send({});
    expect(res.statusCode).toBe(400);
  });

  it('debe retornar 400 si falta username', async () => {
    const res = await request(server).post('/api/users').send({
      email: 'test@example.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(400);
  });

  it('debe retornar 400 si falta email', async () => {
    const res = await request(server).post('/api/users').send({
      username: 'TestUser',
      password: '123456'
    });
    expect(res.statusCode).toBe(400);
  });

  it('debe retornar 400 si falta password', async () => {
    const res = await request(server).post('/api/users').send({
      username: 'TestUser',
      email: 'test@example.com'
    });
    expect(res.statusCode).toBe(400);
  });

  it('debe crear un usuario con datos válidos', async () => {
    const res = await request(server).post('/api/users').send({
      username: 'Alejandro',
      email: 'ale@example.com',
      password: 'salsa12',
      role: 'user',
      isActive: true
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.username).toBe('Alejandro');
  });
});



describe('GET /api/users/:id', () => {
  it('retorna 400 si el id no es válido', async () => {
    const res = await request(server).get('/api/users/abc');
    expect(res.statusCode).toBe(400);
  });

  it('retorna 404 si el usuario no existe', async () => {
    const res = await request(server).get('/api/users/9999');
    expect(res.statusCode).toBe(404);
  });

  it('retorna 200 si el usuario existe', async () => {
    const create = await request(server).post('/api/users').send({
      username: 'Carlos',
      email: 'carlos@example.com',
      password: 'pass123',
      role: 'admin',
      isActive: true
    });
    const res = await request(server).get(`/api/users/${create.body.data.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.username).toBe('Carlos');
  });
});

describe('PATCH /api/users/:id', () => {
  it('retorna 404 si el usuario no existe', async () => {
    const res = await request(server).patch('/api/users/9999');
    expect(res.statusCode).toBe(404);
  });

  it('cambia isActive correctamente', async () => {
    const create = await request(server).post('/api/users').send({
      username: 'Lucia',
      email: 'lucia@example.com',
      password: 'pass123',
      role: 'user',
      isActive: true
    });
    const res1 = await request(server).patch(`/api/users/${create.body.data.id}`);
    expect(res1.statusCode).toBe(200);
    const res2 = await request(server).patch(`/api/users/${create.body.data.id}`);
    expect(res2.statusCode).toBe(200);
    expect(res1.body.data.isActive).not.toBe(res2.body.data.isActive);
  });
});
    
describe('DELETE /api/users/:id', () => {
  it('retorna 400 si el id no es válido', async () => {
    const res = await request(server).delete('/api/users/abc');
    expect(res.statusCode).toBe(400);
  });

  it('retorna 404 si el usuario no existe', async () => {
    const res = await request(server).delete('/api/users/9999');
    expect(res.statusCode).toBe(404);
  });

  it('elimina correctamente y retorna el usuario eliminado', async () => {
    const create = await request(server).post('/api/users').send({
      username: 'Mario',
      email: 'mario@example.com',
      password: 'pass123',
      role: 'user',
      isActive: true
    });
    const res = await request(server).delete(`/api/users/${create.body.data.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.username).toBe('Mario');
  });
});

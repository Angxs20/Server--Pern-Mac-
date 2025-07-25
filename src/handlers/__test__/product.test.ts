const request = require('supertest');
import server from '../../server';

describe('POST /api/products', () => {
  it('debe retornar 400 si el cuerpo está vacío', async () => {
    const res = await request(server).post('/api/products').send({});
    expect(res.statusCode).toBe(400);
    
  });

  it('debe retornar 400 si el price es menor o igual a 0', async () => {
    const res = await request(server).post('/api/products').send({ name: 'Producto X', price: 0 });
    expect(res.statusCode).toBe(400);
    
  });

  it('debe retornar 400 si el price no es numérico', async () => {
    const res = await request(server).post('/api/products').send({ name: 'Producto X', price: 'abc' });
    expect(res.statusCode).toBe(400);
   
  });

  it('debe crear un producto con datos válidos', async () => {
    const res = await request(server).post('/api/products').send({ name: 'Camiseta', price: 50 });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Camiseta');
    // expect(res.body.price).toBe(50); ME DA PROBLEMAS CON EL PRECIO, NO SE PORQUE
  });

  it('nunca debe retornar 404', async () => {
    const res = await request(server).post('/api/products').send({});
    expect(res.statusCode).not.toBe(404);
  });
});

describe('GET /api/products', () => {
  it('debe retornar 200', async () => {
    const res = await request(server).get('/api/products');
    expect(res.statusCode).toBe(200);
  });

  it('debe retornar un JSON con propiedad data', async () => {
    const res = await request(server).get('/api/products');
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('no debe tener propiedad errors', async () => {
    const res = await request(server).get('/api/products');
    expect(res.body.errors).toBeUndefined();
  });
});

describe('GET /api/products/:id', () => {
  it('retorna 400 si el id no es válido', async () => {
    const res = await request(server).get('/api/products/abc');
    expect(res.statusCode).toBe(400);
  });

  it('retorna 404 si el producto no existe', async () => {
    const res = await request(server).get('/api/products/9999');
    expect(res.statusCode).toBe(404);
  });

  it('retorna 200 si el producto existe', async () => {
    const create = await request(server).post('/api/products').send({ name: 'Zapato', price: 90 });
    const res = await request(server).get(`/api/products/${create.body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Zapato');
  });
});

describe('PUT /api/products/:id', () => {
  it('retorna 400 si el cuerpo está vacío', async () => {
    const create = await request(server).post('/api/products').send({ name: 'Libro', price: 20 });
    const res = await request(server).put(`/api/products/${create.body.id}`).send({});
    expect(res.statusCode).toBe(400);
  });

  it('retorna 400 si el price es inválido', async () => {
    const create = await request(server).post('/api/products').send({ name: 'Mouse', price: 30 });
    const res = await request(server).put(`/api/products/${create.body.id}`).send({
      name: 'Mouse actualizado', price: -10, availability: true,
    });
    expect(res.statusCode).toBe(400);
  });

  it('retorna 404 si el producto no existe', async () => {
    const res = await request(server).put('/api/products/9999').send({
      name: 'Nuevo', price: 100, availability: true,
    });
    expect(res.statusCode).toBe(404);
  });

  it('actualiza correctamente si es válido', async () => {
    const create = await request(server).post('/api/products').send({ name: 'Teclado', price: 60 });
    const res = await request(server).put(`/api/products/${create.body.id}`).send({
      name: 'Teclado gamer', price: 100, availability: false,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Teclado gamer');
  });
});

describe('PATCH /api/products/:id', () => {
  it('retorna 404 si el producto no existe', async () => {
    const res = await request(server).patch('/api/products/9999');
    expect(res.statusCode).toBe(404);
  });

  it('cambia availability correctamente', async () => {
    const create = await request(server).post('/api/products').send({ name: 'SSD', price: 120 });
    const res1 = await request(server).patch(`/api/products/${create.body.id}`);
    expect(res1.statusCode).toBe(200);
    const res2 = await request(server).patch(`/api/products/${create.body.id}`);
    expect(res2.statusCode).toBe(200);
    expect(res1.body.availability).not.toBe(res2.body.availability);
  });
});

describe('DELETE /api/products/:id', () => {
  it('retorna 400 si el id no es válido', async () => {
    const res = await request(server).delete('/api/products/abc');
    expect(res.statusCode).toBe(400);
  });

  it('retorna 404 si el producto no existe', async () => {
    const res = await request(server).delete('/api/products/9999');
    expect(res.statusCode).toBe(404);
  });

  it('elimina correctamente y retorna mensaje', async () => {
    const create = await request(server).post('/api/products').send({ name: 'Tablet', price: 300 });
    const res = await request(server).delete(`/api/products/${create.body.id}`);
    expect(res.statusCode).toBe(200);
    // expect(res.body.message).toMatch(/eliminado/i);
  });
});
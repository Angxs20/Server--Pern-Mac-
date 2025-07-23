import request from 'supertest';
import server from '../../server';

describe('GET /api/products', () => {
it('debe retornar todos los productos registrados con los atributos requeridos', async () => {
    const response = await request(server).get('/products');

    // ✅ Status 200
    expect(response.statusCode).toBe(200);

    // ✅ Formato JSON
    expect(response.headers['content-type']).toMatch(/json/);

    // ✅ Propiedad "data" en la respuesta
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);

    // ✅ No debe contener "errors"
    expect(response.body).not.toHaveProperty('errors');

    // ✅ Cada producto debe tener las propiedades requeridas
    response.body.data.forEach(product => {
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('availability'); // cuidado con la ortografía aquí, revisa si es "availability"
    });
  });
})

describe('GET /api/products/:id', () => {
//TODO: Genera todo el codigo necesario para
})


describe('POST /api/products', () => {
    it('debe mostrar errores de validación si el cuerpo está vacío', async () => {
    const response = await request(server)
      .post('/products')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('debe rechazar si price es menor o igual a 0', async () => {
    const response = await request(server)
      .post('/products')
      .send({ name: 'Producto inválido', price: -10 });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('debe rechazar si price no es un número', async () => {
    const response = await request(server)
      .post('/products')
      .send({ name: 'Producto inválido', price: 'abc' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('debe validar que name y price sean obligatorios', async () => {
    const response = await request(server)
      .post('/products')
      .send({ name: 'Solo nombre' }); // sin price

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('debe crear un producto si los datos son válidos', async () => {
    const newProduct = {
      name: 'Producto válido',
      price: 100,
      availibility: true
    };

    const response = await request(server)
      .post('/products')
      .send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject(newProduct);
  });

  it('no debe devolver 404 si el endpoint existe', async () => {
    const response = await request(server)
      .post('/products')
      .send({ name: 'Producto', price: 10 });

    expect(response.statusCode).not.toBe(404);
  });
})


describe('PUT /api/products/:id', () => {
//TODO: Genera todo el codigo necesario para
})

describe('PATCH /api/products/:id', () => {
//TODO: Genera todo el codigo necesario para
})
require('dotenv').config();
const supertest = require('supertest');
const app = require('./app');

const api = supertest(app);

describe('"/products/" endpoint', () => {
  describe('valid requests', () => {
    it('Gets the /products/ endpoint with no query params', async () => {
      const response = await api.get('/products/');

      expect(response.status).toBe(200);
    });

    it('Gets the /products/ endpoint with page param passed in', async () => {
      const response = await api.get('/products/?page=1');

      expect(response.status).toBe(200);
    });

    it('Gets the /products/ endpoint with count param passed in', async () => {
      const response = await api.get('/products/?count=10');

      expect(response.status).toBe(200);
    });

    it('Gets the /products/ endpoint with page and count params passed in', async () => {
      const response = await api.get('/products/?page=1&count=10');

      expect(response.status).toBe(200);
    });
  });

  describe('invalid requests', () => {
    it('Gets the /products/? endpoint with invalid page param passed in', async () => {
      const response = await api.get('/products/?page=fakepage');

      expect(response.status).toBe(500);
    });

    it('Gets the /products/? endpoint with invalid count param passed in', async () => {
      const response = await api.get('/products/?count=fakecount');

      expect(response.status).toBe(500);
    });

    it('Gets the /products/? endpoint with invalid page and invalid count params passed in', async () => {
      const response = await api.get('/products/?page=fakepage&count=fakecount');

      expect(response.status).toBe(500);
    });
  });
});

describe('"/products/:product_id" endpoint', () => {
  describe('valid requests', () => {
    it('Gets the /products/:product_id endpoint', async () => {
      const response = await api.get('/products/1');

      expect(response.status).toBe(200);
    });
  });

  describe('invalid requests', () => {
    it('Gets the /products/:product_id endpoint with invalid id param', async () => {
      const response = await api.get('/products/fakeid');

      expect(response.status).toBe(500);
    });
  });
});

describe('"/products/:product_id/styles" endpoint', () => {
  describe('valid requests', () => {
    it('Gets the /products/:product_id/styles endpoint', async () => {
      const response = await api.get('/products/1/styles');

      expect(response.status).toBe(200);
    });
  });

  describe('invalid requests', () => {
    it('Gets the /products/:product_id/styles endpoint with invalid id param', async () => {
      const response = await api.get('/products/fakeid/styles');

      expect(response.status).toBe(500);
    });
  });
});

describe('"/products/:product_id/related" endpoint', () => {
  describe('valid requests', () => {
    it('Gets the /products/:product_id/related endpoint', async () => {
      const response = await api.get('/products/1/related');

      expect(response.status).toBe(200);
    });
  });

  describe('invalid requests', () => {
    it('Gets the /products/:product_id/related endpoint with invalid id param', async () => {
      const response = await api.get('/products/fakeid/related');

      expect(response.status).toBe(500);
    });
  });
});

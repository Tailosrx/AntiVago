const request = require('supertest');
const app = require('../../src/app');

describe('Auth Controller', () => {
  
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('test@example.com');
    expect(res.body.accessToken).toBeDefined();
  });

  it('should not register user with existing email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'duplicate@example.com',
        username: 'user1',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'duplicate@example.com',
        username: 'user2',
        password: 'password123'
        
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('ya existen');
  });

  it('should login with correct credentials', async () => {
    const user = {
      email: 'login@example.com',
      username: 'loginuser',
      password: 'password123'
    };

    // Crear usuario primero
    await request(app)
      .post('/api/auth/register')
      .send(user);

    // Intentar login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
  });
});
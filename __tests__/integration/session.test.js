import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should not be able to login without a valid user', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'email@dontexist.com', password: 'invalidPassword' });

    expect(response.status).toBe(401);
  });

  it('should not be able to login whit a wrong password', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: `${user.password}${Math.random()}`,
      });

    expect(response.status).toBe(401);
  });
});

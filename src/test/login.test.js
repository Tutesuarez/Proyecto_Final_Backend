
import { login } from "../controller/session.controller";


describe(login, () => {
    test('should return 400 and redirectURL when email or password is missing', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: '', password: '' });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.redirectURL).toBe('/errorlogin');
    })
})
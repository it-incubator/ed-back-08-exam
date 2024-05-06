import { Request, Response, Router } from 'express';
import { authService } from '../services/auth-service';

export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
  const password = req.body.password;
  const login = req.body.login;
  const checkUser = await authService.checkCredentials(login, password);

  if (!checkUser) {
    res.sendStatus(401);
  } else {
    res.status(201).send('Well done!');
  }
});

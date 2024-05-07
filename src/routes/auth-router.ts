import { Request, Response, Router } from 'express';
import { authService } from '../services/auth-service';
import {jwtService} from "../services/jwt-service";

export const authRouter = Router({});

authRouter.post('/login', async (req: Request, res: Response) => {
  const password = req.body.password;
  const login = req.body.login;
  const userId = await authService.checkCredentials(login, password);

  if(!userId) {
    res.sendStatus(401);

    return;
  }

  const accessToken = await jwtService.createAccessToken(userId);
  const refreshToken = await jwtService.createRefreshToken(userId);

  res
      .cookie("refreshToken", refreshToken)
      .status(200)
      .send({ accessToken });

});

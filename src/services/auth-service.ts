import { cryptoService } from './crypto-service';
import { userRepository } from '../repository/user-repository';

export const authService = {
  async checkCredentials(login: string, password: string): Promise<boolean> {
    const user = await userRepository.getUserByLogin(login);

    if (!user) {
      return false;
    }

    if (password === user.passwordHash) {
      return true;
    }

    return cryptoService.compareHash(password, user.passwordHash);
  },
};

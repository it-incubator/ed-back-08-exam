import {userRepository} from '../repository/user-repository';
import {cryptoService} from './crypto-service';
import {emailAdapter} from "../adapters/email.adapter";
import {userQueryRepository} from "../repository/user-query-repo";
import {handleForbiddenResult, handleNotFoundResult, handleSuccessResult, Result} from "../common/result-code";
import {generateUniqCode} from "../helpers/generate-uniq-code";

export const userService = {
  async registerUser(email: string, login: string, password: string, age: number): Promise<Result<string | null>> {
    if(age < 18) {
      return handleForbiddenResult('too yang');
    }

    const salt = await cryptoService.generateSalt();
    const passwordHash = await cryptoService.generateHash(password, salt);

    const createdId = await userRepository.createUser(email, login, passwordHash, age);
    const code = generateUniqCode();

    try {
        await emailAdapter.sendRegistrationEmail(email, code);
    } catch (error) {
      console.log(error);
    }

    return handleSuccessResult(createdId.toString());
  },

  async updateUser(id: string, login: string, email: string, age: number): Promise<Result<null>> {
    const user  = await userQueryRepository.getUser(id);

    if(!user) {
      return handleNotFoundResult('such user not found');
    }

    //TODO: add business logic: only a user with Active status can be updated

    await userRepository.updateUser(id, { login, email, age });

    return handleSuccessResult(null);
  },
};

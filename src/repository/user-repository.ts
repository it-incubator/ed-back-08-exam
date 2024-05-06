import {ObjectId, WithId} from 'mongodb';
import {usersCollection} from '../db/runDb';

export enum UserStatus {
  active,
  inActive,
  banned,
}

export type UserType = {
  email: string;
  login: string;
  passwordHash: string;
  age: number;
  status: UserStatus;
};
export const userRepository = {
  async getUsers(): Promise<WithId<UserType>[]> {
    return usersCollection.find().toArray();
  },

  getUser(id: string): Promise<WithId<UserType> | null> {
    return usersCollection.findOne({ _id: new ObjectId(id)});
  },

  getUserByLogin(login: string): Promise<WithId<UserType> | null> {
    return usersCollection.findOne({ login });
  },

  async createUser(email: string, login: string, passwordHash: string, age: number): Promise<ObjectId> {
    const result = await usersCollection.insertOne({
      email,
      login,
      passwordHash,
      age,
      status: UserStatus.active
    });

    return result.insertedId;
  },

  async updateUser(id: string, { email, login, age }: Omit<UserType, 'passwordHash' | 'status'>): Promise<void> {
    await usersCollection.updateOne({ _id: new ObjectId(id) }, { email, login, age });
  },
};

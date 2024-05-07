import { MongoClient } from 'mongodb';
import { settings } from '../settings';

import {UserType} from "../repository/user-repository";

const mongoUri = settings.MONGO_URI;

export const client = new MongoClient(mongoUri);
const connection = client.db('exams');

export const usersCollection = connection.collection<UserType>('users');

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db('lessons').command({ ping: 1 });
    console.log('Connected successfully to mongo server');
  } catch {
    console.log("Can't connect to db");
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

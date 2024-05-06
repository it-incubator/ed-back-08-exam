import request from 'supertest';
import { client, usersCollection } from '../src/db/runDb';
import { app } from '../src/init-app';
import {delay} from "../src/helpers/delay";

describe('registration', () => {
    beforeAll(async () => {
        await client.connect();

        await usersCollection.deleteMany({});
    });

    afterAll(async () => {

        await client.close();
    });

        it('should register user', async () => {
            const res = await request(app).post('/users/registration')
                .send({
                    email: 'some@gg.tt',
                    login: 'somelogin',
                    password: 'qwerty',
                })
                .expect(201);
            await delay(3000);
        }, 7000);

    it('should fast register user', async () => {
        console.log = jest.fn();
        const res = await request(app).post('/users/registration')
            .send({
                email: 'some@gg.tt',
                login: 'somelogin',
                password: 'qwerty',
            })
            .expect(201);
    }, 1500);
});

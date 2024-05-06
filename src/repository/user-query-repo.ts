import {ObjectId} from "mongodb";
import {usersCollection} from "../db/runDb";

export type UserViewType = {
    email: string;
    login: string;
    id: string;
}

export const userQueryRepository = {
    async getUsers(): Promise<UserViewType[]> {
        const results = await usersCollection.find().toArray();

        return results.map((result)=> ({
            email: result.email,
            login: result.login,
            id: result._id.toString(),
        }))
    },

    async getUser(id: string): Promise<UserViewType | null> {
        const result = await usersCollection.findOne({ _id: new ObjectId(id) });

        if(!result) {
            return null
        }

        return {
            email: result.email,
            login: result.login,
            id: result._id.toString(),
        }
    },
};
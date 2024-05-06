import {delay} from "../helpers/delay";

async function sendEmail(email: string, message: any) {
    await delay(2000);
    return Promise.reject(new Error('The email could not be sent'));
}

export const emailAdapter = {
    async sendRegistrationEmail(email: string, confirmationCode: string) {
       return sendEmail(email, `follow the link <a href="http://localhost:3000?code=${confirmationCode}"> </a>>`)
    },
}
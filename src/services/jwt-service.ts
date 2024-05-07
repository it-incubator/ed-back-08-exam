import jwt from "jsonwebtoken";

type TokenPayload = {
    userId: string
    exp: number
    iat: number
}

export const jwtService = {
    async createRefreshToken(userId: string) {
        return jwt.sign(
            { userId },
            'secret',
            {
                expiresIn: "10d",
            }
        );
    },
    async createAccessToken(userId: string) {
        return jwt.sign(
            { userId },
            'secret',
            {
                expiresIn: "5m",
            }
        );
    },
    async decodeToken(token: string): Promise<TokenPayload | null> {
        try {
            const result = jwt.decode(token);
            return result as TokenPayload;
        } catch (e) {
            console.log("Can't decode token", e);
            return null;
        }
    },
    async verifyToken(token: string): Promise<TokenPayload | null> {
        try {
            const result: any = jwt.verify(token, 'secret');

            return result as TokenPayload;
        } catch (error) {
            console.log("verify token error");
            return null;
        }
    },
};
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import config from "../config";

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'No token provided',
                });
            }

            const decoded = jwt.verify(token, config.jwt_secret)

            req.user = decoded as jwt.JwtPayload;

            console.log('Decoded Token:', decoded);

            next();
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default auth;
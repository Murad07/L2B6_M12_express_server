import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
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

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: You do not have access to this resource',
                });
            }

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
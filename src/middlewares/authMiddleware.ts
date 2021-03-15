import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayLoad {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(
    request: Request, response: Response, next: NextFunction
) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded as TokenPayLoad;

        request.userId = id;

        return next();

    } catch {
        return response.status(401).json({ message: "Login required" });
    }
}
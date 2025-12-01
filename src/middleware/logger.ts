import { NextFunction, Request, Response } from "express";
import fs from 'fs';


// logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
    const logMessage = `${req.method} ${req.path} - ${new Date().toISOString()}\n`;

    // fs.appendFile('logger.txt', logMessage, (err) => {
    //     if (err) {
    //         console.error('Failed to write log:', err);
    //     }
    // });

    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
}

export default logger;
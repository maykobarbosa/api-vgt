import { Request, Response, NextFunction } from "express";
import Jwt from 'jsonwebtoken'

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  const token = authHeader && authHeader.split(" ")[1]


  Jwt.verify(token, process.env.JWT_SECRET as string, function (err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    next();
  });
}
import { Request, Response, NextFunction } from "express";
import Jwt from 'jsonwebtoken'

export function checkToken(req: Request , res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    const token = authHeader && authHeader.split(" ")[1]
    
  
    Jwt.verify(token,"7d14e4b1831c8aa556f9720b5f74c4d7", function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }  
      
      next();
    });
}

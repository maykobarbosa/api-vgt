import { Request, Response, NextFunction } from "express";
import Jwt from 'jsonwebtoken'
import * as base64 from 'base-64';
import { prismaClient } from "../database/prismaClient";
import bcrypt from 'bcrypt'

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

// Middleware para autenticação básica
export const basicAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const [username, password] = base64.decode(authHeader.split(' ')[1]).split(':');

  const valid = await prismaClient.externalUsers.findFirst({
    where: {
      
          username
        
    }
  })
  if(!valid){
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const checkPassword = await bcrypt.compare(password, valid.password)      
    // Verifique se o username e a senha são válidos
  if (checkPassword) {
    return next(); // Autenticação bem-sucedida
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
};
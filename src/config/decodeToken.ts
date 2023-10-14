import jwt, { JwtPayload } from 'jsonwebtoken';

function decodeToken(token: string, secret: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export { decodeToken };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  // leemos de cookie httpOnly o de header Authorization (por si un día lo usas)
  const token = req.cookies?.auth_token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No autenticado' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).auth = decoded; // guardar info en la request
    next();
  } catch {
    return res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

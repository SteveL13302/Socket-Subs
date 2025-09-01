import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/usuarios';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET ?? 'dev_secret';
const JWT_EXPIRES: jwt.SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRES as jwt.SignOptions['expiresIn']) ?? '8h';

function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export const login = async (req: Request, res: Response) => {
  const { user, password } = req.body;
  if (!user || !password) return res.status(400).json({ msg: 'Faltan credenciales' });

  try {
    const u = await Usuario.findOne({ where: { usuario: user } });
    if (!u) return res.status(401).json({ msg: 'Usuario o contraseña incorrectos' });

    const ok = await bcrypt.compare(password, u.getDataValue('pwd'));
    if (!ok) return res.status(401).json({ msg: 'Usuario o contraseña incorrectos' });

    const token = signToken({ id: u.getDataValue('id'), usuario: u.getDataValue('usuario') });

    // Cookie httpOnly (Angular no la puede leer → más seguro)
    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8, // 8h
    });

    // devolvemos info pública del usuario (sin pwd ni password_mail)
    const { id, usuario, empresa, logo, user_mail, host_mail, port_mail, nombre_empresa } = u.get();
    return res.json({
      user: { id, usuario, empresa, logo, user_mail, host_mail, port_mail, nombre_empresa },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: 'Error en login' });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('auth_token');
  res.json({ ok: true });
};

export const me = async (req: Request, res: Response) => {
  // requiere que antes hayas pasado por un middleware que ponga req.auth
  const userId = (req as any).auth?.id;
  if (!userId) return res.status(401).json({ msg: 'No autenticado' });

  const u = await Usuario.findByPk(userId, { attributes: { exclude: ['pwd', 'password_mail'] } });
  if (!u) return res.status(401).json({ msg: 'No autenticado' });

  return res.json({ user: u });
};

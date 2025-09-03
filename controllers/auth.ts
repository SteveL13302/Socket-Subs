// BACKEND: src/controllers/auth.ts
import { Request, Response, CookieOptions } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/usuarios';

const JWT_SECRET: Secret =
  process.env.JWT_SECRET || 'dev_secret';

const JWT_EXPIRES: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRES as SignOptions['expiresIn']) || '8h';

// Si estás detrás de Nginx con HTTPS en producción,
// necesitas SameSite=None + Secure para cookies cross-site.
const IS_PROD = process.env.NODE_ENV === 'production';

const COOKIE_OPTS: CookieOptions = {
  httpOnly: true,
  path: '/',                // importante para que clearCookie funcione
  maxAge: 1000 * 60 * 60 * 8, // 8h
  sameSite: IS_PROD ? 'none' : 'lax',
  secure: IS_PROD,           // obligatorio cuando sameSite = 'none'
  // domain: 'subs.socket-studio.com', // opcional: deja comentado a menos que lo necesites
};

function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export const login = async (req: Request, res: Response) => {
  const { user, password } = req.body as { user?: string; password?: string };
  if (!user || !password) {
    return res.status(400).json({ msg: 'Faltan credenciales' });
  }

  try {
    // Busca por usuario (ajusta si quisieras permitir email también)
    const u = await Usuario.findOne({ where: { usuario: user } });
    if (!u) return res.status(401).json({ msg: 'Usuario o contraseña incorrectos' });

    const ok = await bcrypt.compare(password, u.getDataValue('pwd'));
    if (!ok) return res.status(401).json({ msg: 'Usuario o contraseña incorrectos' });

    const token = signToken({
      id: u.getDataValue('id'),
      usuario: u.getDataValue('usuario'),
    });

    // Set-Cookie: auth_token=...; HttpOnly; SameSite=None; Secure
    res.cookie('auth_token', token, COOKIE_OPTS);

    // Devolver info pública del usuario
    const {
      id,
      usuario,
      empresa,
      logo,
      user_mail,
      host_mail,
      port_mail,
      nombre_empresa,
    } = u.get();

    return res.json({
      user: { id, usuario, empresa, logo, user_mail, host_mail, port_mail, nombre_empresa },
    });
  } catch (e) {
    console.error('[auth/login] error:', e);
    return res.status(500).json({ msg: 'Error en login' });
  }
};

export const logout = (_req: Request, res: Response) => {
  // Para que borre la cookie, las opciones deben coincidir (path, sameSite, secure, domain si aplica)
  res.clearCookie('auth_token', COOKIE_OPTS);
  return res.json({ ok: true });
};

export const me = async (req: Request, res: Response) => {
  const userId = (req as any).auth?.id;
  if (!userId) return res.status(401).json({ msg: 'No autenticado' });

  const u = await Usuario.findByPk(userId, {
    attributes: { exclude: ['pwd', 'password_mail'] },
  });
  if (!u) return res.status(401).json({ msg: 'No autenticado' });

  return res.json({ user: u });
};

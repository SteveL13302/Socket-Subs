import bcrypt from 'bcryptjs';
import database from '../database/connection';
import { Usuario } from '../models/usuarios';       // ajusta la ruta si tus modelos están en otro sitio


(async () => {
  try {
    await database.authenticate();
    console.log('Conectado a DB');

    const base = {
      user_mail: 'facturaelect@misdocumentoselectronicos.com',
      password_mail: 'M@rlon2025',
      host_mail: 'smtp.hostinger.com',
      port_mail: 465,
      nombre_empresa: 'SocketStudio',
    };

    const users = [
      { usuario: 'consu_lapo', empresa: 'Consu Lapo', logo: 'https://mislogos.com/consulapo.png', plain: 'consu_lapo123' },
      { usuario: 'agepro',     empresa: 'Agepro S.A.', logo: 'https://mislogos.com/agepro.png',     plain: 'agepro123' },
    ];

    for (const u of users) {
      const hash = await bcrypt.hash(u.plain, 10);
      await Usuario.upsert({ ...base, ...u, pwd: hash });
    }

    console.log('Usuarios insertados/actualizados con hash bcrypt');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

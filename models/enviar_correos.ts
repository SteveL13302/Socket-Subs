import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';

class EnviosCorreos extends Model {
  public id!: number;
  public asunto!: string;
  public fecha_envio!: Date;
  public tipo_plantilla!: string;
  public titulo_mensaje!: string;
  public mensaje!: string;
  public habilitar_boton!: boolean;
  public texto_boton!: string | null;
  public enlace_boton!: string | null;
  public habilitar_archivo!: boolean; // Nuevo campo
  public ruta_archivo!: string | null; // Nuevo campo
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EnviosCorreos.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  asunto: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fecha_envio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo_plantilla: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  habilitar_boton: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  texto_boton: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  enlace_boton: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  habilitar_archivo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Campo para habilitar el archivo
  },
  ruta_archivo: {
    type: DataTypes.STRING(255),
    allowNull: true, // Ruta del archivo
  },
  habilitar_imagen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  ruta_imagen: {
    type: DataTypes.STRING(255),
    allowNull: true, 
  },
  enviar_por_correo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, 
  },
  enviar_por_whatsapp: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'envios_correo',
  sequelize: database,
  timestamps: true,
});

export default EnviosCorreos;

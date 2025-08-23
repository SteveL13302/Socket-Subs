import { DataTypes, Model, Optional } from 'sequelize';
import database from '../database/connection';

interface ContactoAttributes {
  id: number;
  cedula?: string | null;
  nombre_apellido: string;
  telefono?: string | null;
  correo?: string | null;
  ciudad?: string | null;
  direccion?: string | null;
  activo: boolean;
  term_condi: boolean;
  pagina?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContactoCreationAttributes extends Optional<ContactoAttributes, 'id' | 'activo' | 'term_condi' | 'createdAt' | 'updatedAt'> {}

class Contacto extends Model<ContactoAttributes, ContactoCreationAttributes> implements ContactoAttributes {
  public id!: number;
  public cedula!: string | null;
  public nombre_apellido!: string;
  public telefono!: string | null;
  public correo!: string | null;
  public ciudad!: string | null;
  public direccion!: string | null;
  public activo!: boolean;
  public term_condi!: boolean;
  public pagina!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contacto.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cedula: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  nombre_apellido: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  correo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ciudad: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  term_condi: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  pagina: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'contactos',
  sequelize: database,
  timestamps: true, // Sequelize maneja createdAt y updatedAt automáticamente
});

export default Contacto;

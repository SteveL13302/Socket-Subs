import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';


export class Usuario extends Model {
  public id!: number;
  public usuario!: string;
  public pwd!: string;
  public empresa!: string;
  public logo?: string;
  public user_mail?: string;
  public password_mail?: string;
  public host_mail?: string;
  public port_mail?: number;
  public nombre_empresa?: string;
}

Usuario.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    usuario: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    pwd: { type: DataTypes.STRING(255), allowNull: false },
    empresa: { type: DataTypes.STRING(100), allowNull: false },
    logo: { type: DataTypes.STRING(255) },
    user_mail: { type: DataTypes.STRING(100) },
    password_mail: { type: DataTypes.STRING(100) },
    host_mail: { type: DataTypes.STRING(100) },
    port_mail: { type: DataTypes.INTEGER },
    nombre_empresa: { type: DataTypes.STRING(100) },
  },
  {
    sequelize:database,
    tableName: 'usuarios',
    timestamps: false,
  }
);

export default Usuario;
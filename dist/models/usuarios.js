"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Usuario extends sequelize_1.Model {
}
exports.Usuario = Usuario;
Usuario.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    usuario: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true },
    pwd: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    empresa: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    logo: { type: sequelize_1.DataTypes.STRING(255) },
    user_mail: { type: sequelize_1.DataTypes.STRING(100) },
    password_mail: { type: sequelize_1.DataTypes.STRING(100) },
    host_mail: { type: sequelize_1.DataTypes.STRING(100) },
    port_mail: { type: sequelize_1.DataTypes.INTEGER },
    nombre_empresa: { type: sequelize_1.DataTypes.STRING(100) },
}, {
    sequelize: connection_1.default,
    tableName: 'usuarios',
    timestamps: false,
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Contacto extends sequelize_1.Model {
}
Contacto.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    nombre_apellido: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    ciudad: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    term_condi: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    pagina: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    tableName: 'contactos',
    sequelize: connection_1.default,
    timestamps: true, // Sequelize maneja createdAt y updatedAt automáticamente
});
exports.default = Contacto;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportarContactosExcel = void 0;
const contacto_1 = __importDefault(require("../models/contacto"));
const exceljs_1 = __importDefault(require("exceljs"));
const SUPERUSER = ((_a = process.env.SUPERUSER) !== null && _a !== void 0 ? _a : 'socket_studio').toLowerCase();
const isSuperuser = (u) => !!u && u.toLowerCase() === SUPERUSER;
const exportarContactosExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const usuario = (_b = req.auth) === null || _b === void 0 ? void 0 : _b.usuario;
        const where = isSuperuser(usuario) ? {} : { pagina: usuario };
        const contactos = yield contacto_1.default.findAll({
            where,
            order: [['id', 'ASC']],
        });
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Contactos");
        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Cédula", key: "cedula", width: 20 },
            { header: "Nombre y Apellido", key: "nombre_apellido", width: 30 },
            { header: "Teléfono", key: "telefono", width: 20 },
            { header: "Correo", key: "correo", width: 30 },
            { header: "Ciudad", key: "ciudad", width: 20 },
            { header: "Dirección", key: "direccion", width: 25 },
            { header: "Activo", key: "activo", width: 10 },
            { header: "Página", key: "pagina", width: 20 },
        ];
        worksheet.getRow(1).font = { bold: true };
        worksheet.autoFilter = { from: 'A1', to: 'I1' };
        contactos.forEach(c => worksheet.addRow({
            id: c.id,
            cedula: c.cedula,
            nombre_apellido: c.nombre_apellido,
            telefono: c.telefono,
            correo: c.correo,
            ciudad: c.ciudad,
            direccion: c.direccion,
            activo: c.activo ? 'Sí' : 'No',
            pagina: c.pagina,
        }));
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=contactos.xlsx");
        yield workbook.xlsx.write(res);
        res.end();
    }
    catch (error) {
        console.error("Error al exportar contactos a Excel:", error);
        res.status(500).json({ success: false, message: "Error al exportar" });
    }
});
exports.exportarContactosExcel = exportarContactosExcel;

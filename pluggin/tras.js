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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageWhatsapp = void 0;
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
/*
export const sendMessageWhatsapp = async (body: WhatsappMessageData) => {
    const { whatsapp, url, key, text } = body;

    console.log(body);

    try {
        const data = qs.stringify({ key, whatsapp, text });

        console.log("data", data);
        console.log("url", url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(Error: ${result.message || 'Solicitud fallida'});
        }

        return result;

    } catch (error: any) {
        console.error(Error al enviar mensaje a ${whatsapp}:, error.message);
    }
};
*/
const sendMessageWhatsapp = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { whatsapp, url, key, text } = body;
    console.log(body);
    try {
        const data = qs_1.default.stringify({ key, whatsapp, text });
        console.log("data", data);
        console.log("url", url);
        const response = yield axios_1.default.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response.data;
    }
    catch (error) {
        // console.error(Error al enviar mensaje a ${whatsapp}:, error.response?.data || error.message);
    }
});
exports.sendMessageWhatsapp = sendMessageWhatsapp;

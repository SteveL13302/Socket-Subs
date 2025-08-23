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
exports.httpClientPlugin = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const qs_1 = __importDefault(require("qs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { ENDPOINT_WHATSAPP, KEY_WHATSAPP } = process.env;
const agent = new https_1.default.Agent({
    rejectUnauthorized: false,
});
const config = {
    httpsAgent: agent,
    headers: {
        'Content-Type': 'application/json'
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
};
const configWhatsapp = {
    httpsAgent: agent,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
};
exports.httpClientPlugin = {
    //   get: async(url: string ) => {
    //     const { data } = await axios.get( url );
    //     return data;
    //   },
    post: (url, body) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(url, body, config);
            return response.data;
        }
        catch (error) {
            console.error('Error en la solicitud POST:', error);
            throw error;
        }
    }),
    postWhatsappText: (body) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { whatsapp, text } = body;
            const key = KEY_WHATSAPP === null || KEY_WHATSAPP === void 0 ? void 0 : KEY_WHATSAPP.toString();
            const data = qs_1.default.stringify({ key, whatsapp, text });
            const url = (ENDPOINT_WHATSAPP === null || ENDPOINT_WHATSAPP === void 0 ? void 0 : ENDPOINT_WHATSAPP.toString()) + "?action=send_text";
            const response = yield axios_1.default.post(url, data, configWhatsapp);
            return response.data;
        }
        catch (error) {
            console.error('Error en la solicitud POST:', error);
            throw error;
        }
    }),
    postWhatsappMedia: (body) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { whatsapp, text, file } = body;
            const key = KEY_WHATSAPP === null || KEY_WHATSAPP === void 0 ? void 0 : KEY_WHATSAPP.toString();
            const data = qs_1.default.stringify({ key, whatsapp, text, file });
            const url = (ENDPOINT_WHATSAPP === null || ENDPOINT_WHATSAPP === void 0 ? void 0 : ENDPOINT_WHATSAPP.toString()) + "?action=file_doc";
            const response = yield axios_1.default.post(url, data, configWhatsapp);
            return response.data;
        }
        catch (error) {
            console.error('Error en la solicitud POST:', error);
            throw error;
        }
    }),
    postWhatsappButtons: (body) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { whatsapp, text, buttons, typeId = 'user' } = body;
            const key = KEY_WHATSAPP === null || KEY_WHATSAPP === void 0 ? void 0 : KEY_WHATSAPP.toString();
            const url = `${ENDPOINT_WHATSAPP}?action=send_button_text`;
            const payload = {
                key,
                whatsapp,
                text,
                TypeId: typeId,
                buttons: JSON.stringify(buttons)
            };
            const data = qs_1.default.stringify(payload);
            const response = yield axios_1.default.post(url, data, configWhatsapp);
            return response.data;
        }
        catch (error) {
            console.error('Error enviando botones por WhatsApp:', error);
            throw error;
        }
    })
    //   put: async(url: string, body: Object) => {},
    //   delete: async(url: string ) => {},
};

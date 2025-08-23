import axios, { AxiosRequestConfig } from 'axios';
import https from 'https'
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

const { ENDPOINT_WHATSAPP, KEY_WHATSAPP } = process.env;


interface WhatsappMessageData {
    key?: string;
    whatsapp: string | null;
    text: string;
    file?: string;
}

const agent = new https.Agent({
    rejectUnauthorized: false,
});

const config: AxiosRequestConfig = {
    httpsAgent: agent,
    headers: {
        'Content-Type': 'application/json'
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
};

const configWhatsapp: AxiosRequestConfig = {
    httpsAgent: agent,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
};

export const httpClientPlugin = {

    //   get: async(url: string ) => {
    //     const { data } = await axios.get( url );
    //     return data;
    //   },

    post: async (url: string, body: Object) => {
        try {
            const response = await axios.post(url, body, config);
            return response.data;
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
            throw error;  
        }
    },

    postWhatsappText: async (body: WhatsappMessageData) => {
        try {
            const { whatsapp, text } = body;
            
            const key = KEY_WHATSAPP?.toString();

            const data = qs.stringify({ key, whatsapp, text });

            const url = ENDPOINT_WHATSAPP?.toString() + "?action=send_text"
            
            const response = await axios.post(url, data, configWhatsapp);
            return response.data;
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
            throw error;  
        }
    },

    postWhatsappMedia: async (body: WhatsappMessageData) => {
        try {
            const { whatsapp, text, file } = body;
            
            const key = KEY_WHATSAPP?.toString();
            
            const data = qs.stringify({ key, whatsapp, text, file });

            const url = ENDPOINT_WHATSAPP?.toString() + "?action=file_doc"
            
            const response = await axios.post(url, data, configWhatsapp);
            return response.data;
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
            throw error;  
        }
    },
    //   put: async(url: string, body: Object) => {},
    //   delete: async(url: string ) => {},

};


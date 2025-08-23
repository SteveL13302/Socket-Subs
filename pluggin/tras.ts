import qs from 'qs';
import axios from 'axios';

interface WhatsappMessageData {
    key: string;
    whatsapp: string | null;
    text: string;
    url: string;
}

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

export const sendMessageWhatsapp = async (body: WhatsappMessageData) => {
    const { whatsapp, url, key, text } = body;

    console.log(body);

    try {
        const data = qs.stringify({ key, whatsapp, text });

        console.log("data", data);
        console.log("url", url);

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data;

    } catch (error: any) {
        // console.error(Error al enviar mensaje a ${whatsapp}:, error.response?.data || error.message);
    }
};
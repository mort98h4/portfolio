import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { fullnameMax, fullnameMin, messageMax, messageMin, phoneRegex } from '../constants';
import { Resend } from 'resend';
import { htmlTemp } from '../helpers/htmlTemplate';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    sendMessage: defineAction({
        accept: 'form',
        input: z.object({
            fullname: z.string().trim().min(fullnameMin).max(fullnameMax),
            email: z.string().email(),
            phone: z.string().regex(phoneRegex).optional(),
            message: z.string().trim().min(messageMin).max(messageMax),
        }),
        handler: async (input) => {
            const subject = `New message from ${input.fullname}`;

            let html = htmlTemp
                        .replaceAll('%FULLNAME%', input.fullname)
                        .replace('%MESSAGE%', input.message)
                        .replace('%EMAIL%', input.email)
                        .replace('%PHONE%', input.phone);


            const { data, error } = await resend.emails.send({
                from: 'Morten Gross <no-reply@mortengross.dk>',
                // from: 'this@will-not-work.com',
                to: ['mortengross_93@hotmail.com'],
                subject: subject,
                html: html,
            });

            if (error) {
                throw new ActionError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error.message,
                });
            }

            return data;
        }
    })
}
import nodemailer from 'nodemailer';

export interface EmailProperties {
    address: string;
    subject: string;
    text: string;
}

export const sendMail = (properties: EmailProperties) => {
    //TODO
}
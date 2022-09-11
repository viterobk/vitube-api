import crypto from 'crypto';

export const base64Encode = (text: string): string => Buffer.from(text).toString('base64');
export const base64Decode = (base64Text: string): string => Buffer.from(base64Text).toString('utf-8');

export const SHA256Encode = (text: string, key: string): string => crypto
    .createHmac('SHA256', key)
    .update(text)
    .digest('base64');
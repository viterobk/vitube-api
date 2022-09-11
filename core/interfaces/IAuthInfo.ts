export interface IAuthInfo {
    isValid: boolean;
    expired?: boolean;
    userId?: string;
    isAdmin?: boolean;
};
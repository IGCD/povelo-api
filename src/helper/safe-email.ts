import normalizeEmail from 'normalize-email';

export const safeEmail = (email: string) => {
    return normalizeEmail(email.toLowerCase().trim());
};

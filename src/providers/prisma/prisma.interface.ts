export type Expose<T> = Omit<Omit<Omit<T, 'password'>, 'phoneNumber'>, 'refreshToken'>;

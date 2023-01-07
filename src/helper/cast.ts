import { UnauthorizedException } from '@nestjs/common';
import { ENV_NOT_FOUND } from 'src/errors/errors.constant';

const number = (value: string): number | undefined => (isNaN(parseInt(value)) ? undefined : parseInt(value));
const string = (value: string): string => value;
const boolean = (value: string): boolean => (value === 'true' ? true : false);

const typeConverter = { number, string, boolean };
type TypeConverterKey = keyof typeof typeConverter;
type TypeConverterReturnType<K extends TypeConverterKey> = ReturnType<typeof typeConverter[K]>;
type CaseFunctionType = <K extends TypeConverterKey, R extends TypeConverterReturnType<K>>(key: string, type: K, defaultValue?: R) => any;

export const cast: CaseFunctionType = (key, type, defaultValue?) => {
    const value = process.env[key];

    if (value === undefined && defaultValue) {
        return defaultValue;
    } else if (value) {
        const result = typeConverter[type](value);
        return result;
    } else {
        throw new UnauthorizedException(`${ENV_NOT_FOUND}(${key})`);
    }
};

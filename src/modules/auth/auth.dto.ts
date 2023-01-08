import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    password!: string;
}

export class RegistDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;
}

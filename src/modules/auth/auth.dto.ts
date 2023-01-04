import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    password!: string;
}

export class RegistDto {
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    phoneNumber!: string;
}

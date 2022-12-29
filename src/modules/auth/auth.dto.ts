import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    password!: string;
}

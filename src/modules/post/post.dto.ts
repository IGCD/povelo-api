import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreatePostDto {
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    userId!: number;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;
}

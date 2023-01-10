import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
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

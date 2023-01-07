import { BadRequestException, Injectable } from '@nestjs/common';
import { POST_NOT_FOUND } from 'src/errors/errors.constant';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreatePostDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async createPost(data: CreatePostDto) {
        return await this.prisma.post.create({
            data,
        });
    }

    async getPosts() {
        return await this.prisma.post.findMany({}).catch((error) => {
            throw new BadRequestException(POST_NOT_FOUND);
        });
    }

    async getPost(id: number) {
        return await this.prisma.post
            .findUniqueOrThrow({
                where: { id },
            })
            .catch((error) => {
                throw new BadRequestException(POST_NOT_FOUND);
            });
    }
}

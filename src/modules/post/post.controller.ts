import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Post()
    async create(@Body() data: CreatePostDto) {
        return await this.postService.createPost(data);
    }

    @Get()
    async getAll() {
        return await this.postService.getPosts();
    }

    @Get(':postId')
    async get(@Param('postId', ParseIntPipe) postId: number) {
        return await this.postService.getPost(postId);
    }

    @Post('thumbnail')
    @UseInterceptors(FileInterceptor('file'))
    async thumbnail(@UploadedFile('file') file: Express.Multer.File) {}
}

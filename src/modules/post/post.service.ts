import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}
}

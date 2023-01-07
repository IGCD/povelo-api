import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
    imports: [ConfigModule],
    providers: [TokenService, JwtService],
    exports: [TokenService],
})
export class TokenModule {}

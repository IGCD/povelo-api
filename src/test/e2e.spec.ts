import { Test } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/auth.service';
import { ModuleMocker } from 'jest-mock';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/providers/token/token.service';
const moduleMocker = new ModuleMocker(global);

describe('Auth', () => {
    let authService: AuthService;
    let app: INestApplication;
    const mockPrismaService = {
        user: {
            findUnique: jest.fn().mockResolvedValue({}),
        },
    };
    const mockTokenService = {
        signJwt: jest.fn(),
    };
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: PrismaService, useValue: mockPrismaService },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
                {
                    provide: TokenService,
                    useValue: mockTokenService,
                },
            ],
        }).compile();
        authService = moduleRef.get<AuthService>(AuthService);
    });

    /**
     * email!: string;
     * password!: string;
     */
    describe('login', () => {
        it('does attempt to get the user by email, password', async () => {
            const mocking = {
                accessToken: 'accessToken',
                user: {
                    id: 0,
                    name: 'name',
                    email: 'string',
                    profilePictureUrl: 'string',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            };
            const getByEmailPw = jest.spyOn(authService, 'login').mockImplementation(async () => {
                return mocking;
            });
            await authService.login('kkksdtw@naver.com', '123123');
            expect(getByEmailPw).toBeTruthy();
        });
    });
});

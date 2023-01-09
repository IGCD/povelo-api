import { UserController } from 'src/modules/user/user.controller';
import { Test } from '@nestjs/testing';
import { UserService } from 'src/modules/user/user.service';
import { Expose } from 'src/providers/prisma/prisma.interface';
import { User } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, PrismaService],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        userController = moduleRef.get<UserController>(UserController);
    });

    describe('get', () => {
        it('get one', async () => {
            const userId = 13;
            let result: Expose<User> = {
                id: 0,
                name: '',
                email: null,
                profilePictureUrl: null,
                createdAt: new Date(),
                updatedAt: null,
            };
            jest.spyOn(userService, 'get').mockResolvedValue(result);
            await expect(userController.get(userId)).resolves.toEqual(result);
        });
    });
});

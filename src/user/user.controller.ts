import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {DeleteResult} from "typeorm";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async findAllUsers(): Promise<UserEntity[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findUser(@Param('id') userID: string) {
        return await this.userService.findUser(userID);
    }

    @Post('signup')
    async createUser(@Body('firstName') firstName: string,
                     @Body('lastName') lastName: string,
                     @Body('about') about: string,
                     @Body('username') username: string,
                     @Body('password') password: string,
                     @Body('email') email: string): Promise<UserEntity> {
        return await this.userService.addUser(firstName, lastName, about, username, password, email);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string,
                     @Body('firstName') firstName: string,
                     @Body('lastName') lastName: string,
                     @Body('about') about: string,
                     @Body('password') password: string,
                     @Body('email') email: string): Promise<UserEntity> {
        return await this.userService.updateExistingUser(id, firstName, lastName, about, password, email);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
        return await this.userService.removeUser(id);
    }
}

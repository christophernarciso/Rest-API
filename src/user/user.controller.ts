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
    async findUser(@Param('id') userID: number) {
        return await this.userService.findUser(userID);
    }

    @Post()
    async createUser(@Body('name') name: string,
                     @Body('about') about: string,
                     @Body('user') username: string,
                     @Body('pass') password: string,
                     @Body('email') email: string): Promise<UserEntity> {
        return await this.userService.addUser(name, about, username, password, email);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number,
                     @Body('name') name: string,
                     @Body('about') about: string,
                     @Body('user') username: string,
                     @Body('pass') password: string,
                     @Body('email') email: string): Promise<UserEntity> {
        return await this.userService.updateExistingUser(id, name, about, username, password, email);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
        return await this.userService.removeUser(id);
    }
}

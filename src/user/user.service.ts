import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {DeleteResult, Repository} from "typeorm";
import {Body, Injectable, NotFoundException} from "@nestjs/common";
import {genSalt, hashSync} from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>) {
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userEntityRepository.find();
    }

    async findUser(userID: string): Promise<UserEntity> {
        return await this.userEntityRepository.findOne({where: {username: userID}});
    }

    async addUser(first: string, last: string, about: string, user: string, pass: string, email: string): Promise<UserEntity> {
        const userEntity = this.userEntityRepository.create();
        userEntity.firstName = first;
        userEntity.lastName = last;
        userEntity.about = about;
        userEntity.username = user;
        userEntity.password = pass;
        userEntity.email = email;
        // TODO ADD SALT OR HASH PASSWORD
        userEntity.salt = pass;
        return await this.userEntityRepository.save(userEntity);
    }

    async removeUser(userID: string): Promise<DeleteResult> {
        const entity = await this.verifyUserEntity(userID);
        return await this.userEntityRepository.delete(entity.id);
    }

    async updateExistingUser(username: string, firstName: string, lastName: string, about: string, pass: string, email: string) {
        const update = await this.verifyUserEntity(username);
        if (firstName)
            update.firstName = firstName;
        if (lastName)
            update.lastName = lastName;
        if (about)
            update.about = about;
        if (pass)
            update.password = pass;
        if (email)
            update.email = email;
        return await this.userEntityRepository.save(update);
    }

    private async verifyUserEntity(user: string) {
        const entity = await this.findUser(user);
        if (!entity)
            throw new NotFoundException(`The requested user [${user}] is not available.`);
        return entity;
    }
}

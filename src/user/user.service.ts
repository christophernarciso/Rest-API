import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {DeleteResult, Repository} from "typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>) {
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userEntityRepository.find();
    }

    async findUser(userID: number): Promise<UserEntity> {
        return await this.userEntityRepository.findOneOrFail(userID);
    }

    async addUser(name: string, about: string, user: string, pass: string, email: string): Promise<UserEntity> {
        const userEntity = this.userEntityRepository.create();
        userEntity.name = name;
        userEntity.about = about;
        userEntity.username = user;
        userEntity.password = pass;
        userEntity.email = email;
        return await this.userEntityRepository.save(userEntity);
    }

    async removeUser(userID: number): Promise<DeleteResult> {
        return await this.userEntityRepository.delete(userID);
    }

    async updateExistingUser(userID: number, name: string, about: string, user: string, pass: string, email: string) {
        const update = await this.findUser(userID);
        if (name)
            update.name = name;
        if (about)
            update.about = about;
        if (pass)
            update.password = pass;
        if (email)
            update.email = email;
        return await this.userEntityRepository.save(update);
    }
}

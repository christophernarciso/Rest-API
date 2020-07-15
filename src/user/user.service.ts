import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {DeleteResult, Repository} from "typeorm";
import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {compare, genSalt, hashSync} from "bcrypt";

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
        const {hash, salt} = await this.generateHash(pass);
        const userEntity = this.userEntityRepository.create({
            firstName: first,
            lastName: last,
            about: about,
            username: user,
            email: email,
            password: hash,
            salt: salt,
        });
        try {
            const save = await this.userEntityRepository.save(userEntity);
            return new UserEntity(
                {
                    id: save.id,
                    username: save.username,
                    email: save.email
                }
            );
        } catch (e) {
            throw new ConflictException(e.toString());
        }
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
        if (pass) {
            const {hash, salt} = await this.generateHash(pass);
            update.password = hash;
            update.salt = salt;
        }
        if (email)
            update.email = email;
        const save = await this.userEntityRepository.save(update);
        return new UserEntity(
            {
                id: save.id,
                username: save.username,
                email: save.email,
                firstName: save.firstName,
                lastName: save.lastName,
                about: save.about
            }
        );
    }

    private async verifyUserEntity(user: string): Promise<UserEntity> {
        const entity = await this.findUser(user);
        if (!entity)
            throw new NotFoundException(`The requested user [${user}] is not available.`);
        return entity;
    }

    private async generateHash(password: string): Promise<{ hash: string; salt: string }> {
        const genSaltValue = await genSalt(15);
        const genHashValue = await hashSync(password, genSaltValue);
        return {hash: genHashValue, salt: genSaltValue};
    }

    public async isValidUserData(userHash: string, userPassword: string): Promise<boolean> {
        return await compare(userPassword, userHash);
    }

}

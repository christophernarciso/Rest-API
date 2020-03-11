import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>) {}

    findAll(): Promise<UserEntity[]> {
        return  this.userEntityRepository.find();
    }

    findUser(): Promise<UserEntity> {
        return this.userEntityRepository.findOneOrFail();
    }
}

import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PostEntity} from "../post/post.entity";
import {GenericEntity} from "../generic/generic.entity";

enum Roles {
    USER = 'User',
    ADMIN = 'Admin'
}

@Entity({name: 'users'})
export class UserEntity extends GenericEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 30})
    name: string;

    @Column({length: 15, unique: true})
    username: string;

    @Column({length: 15})
    password: string;

    @Column({type: 'text', nullable: true})
    about: string;

    @Column({length: 50, unique: true})
    email: string;

    @Column({type: 'enum', enum: Roles, default: Roles.USER})
    role: Roles;

    @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
    posts: PostEntity[];
}
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

enum Roles {
    USER = 'User',
    ADMIN = 'Admin'
}

@Entity({name: 'users'})
export class UserEntity {
    // Primary key
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, unique: true})
    name: string;

    @Column({type: 'text', nullable: true})
    about: string;

    @Column({length: 50, unique: true})
    email: string;

    @Column({type: 'enum', enum: Roles, default: Roles.USER})
    role: Roles;

    @Column({type: 'timestamp'})
    last_online: string;

    @Column({type: 'timestamp'})
    creation_date: string;


}
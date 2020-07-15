import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {PostEntity} from "../post/post.entity";
import {GenericEntity} from "../generic/generic.entity";
import {CommentEntity} from "../comment/comment.entity";
import {Exclude} from 'class-transformer';

enum Roles {
    USER = 'User',
    ADMIN = 'Admin'
}

@Entity({name: 'users'})
export class UserEntity extends GenericEntity {

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({length: 15, unique: true})
    username: string;

    @Exclude()
    @Column({type: 'varchar', length: 500})
    password: string;

    @Exclude()
    @Column({type: 'varchar', length: 500})
    salt: string;

    @Column({type: 'text', nullable: true})
    about: string;

    @Column({length: 50, unique: true})
    email: string;

    @Column({type: 'enum', enum: Roles, default: Roles.USER})
    role: Roles;

    @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
    posts: PostEntity[];

    @ManyToOne(() => CommentEntity, (comment: CommentEntity) => comment.post,
        {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    comments: CommentEntity[];
}
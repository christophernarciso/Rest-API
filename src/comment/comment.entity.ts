import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from "../user/user.entity";
import {GenericEntity} from "../generic/generic.entity";
import {PostEntity} from "../post/post.entity";

@Entity({name: 'comments'})
export class CommentEntity extends GenericEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    body: string;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments,
        {onUpdate: 'CASCADE', onDelete: 'CASCADE'})

    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments,
        {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    post: PostEntity;
}
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from "../user/user.entity";
import {GenericEntity} from "../generic/generic.entity";

@Entity({name: 'posts'})
export class PostEntity extends GenericEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    title: string;

    @Column({type: 'text'})
    body: string;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts,
        {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: UserEntity;
}
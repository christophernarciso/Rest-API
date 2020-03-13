import {CreateDateColumn} from 'typeorm';

export class GenericEntity {
    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP', type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP', type: 'timestamp'})
    updated_at: Date;
}
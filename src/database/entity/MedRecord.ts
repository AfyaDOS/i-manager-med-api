import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Client from './Client';
import Specialist from './Specialist';

@Entity()
class MedRecord extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => Client, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn()
    client: Client;

    @ManyToOne(() => Specialist, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn()
    specialist: Specialist;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({ type: 'text', nullable: false })
    description: string;
}

export default MedRecord;

import { type } from 'os';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

import User from './User';
import Specialties from './Specialties';

@Entity('specialists')
class Specialist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ unique: true })
  registry: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  cell: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (specialists) => Specialist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Specialties, (specialists) => specialists.specialist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  specialties: Specialties[];
}

export default Specialist;

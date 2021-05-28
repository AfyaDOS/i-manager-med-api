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
} from 'typeorm';

import User from './User';
import Specialties from './Specialties';

@Entity('specialists')
class Specialist {
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
  user: User;

  @OneToMany((type) => Specialties, (specialists) => Specialist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  specialties: Specialties[];
}

export default Specialist;

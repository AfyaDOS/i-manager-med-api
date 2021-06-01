import { type } from 'os';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';

import Specialist from './Specialist';

@Entity('specialties')
class Specialties extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  specialty: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Specialist, (specialist) => specialist.specialties, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'specialist_id' })
  specialist: Specialist;
}

export default Specialties;

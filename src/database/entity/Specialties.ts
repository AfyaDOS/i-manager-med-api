import { type } from 'os';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Specialist from './Specialist';

@Entity('specialties')
class Specialties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  specialty: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Specialist, (specialties) => Specialties, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  specialist: Specialist;
}

export default Specialties;

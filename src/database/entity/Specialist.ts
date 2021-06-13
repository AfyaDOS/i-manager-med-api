import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from './User';
import Specialties from './Specialties';
import Address from './Address';

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

  @ManyToOne(() => User, () => Specialist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Specialties, (specialists) => specialists.specialist)
  @JoinTable()
  @JoinColumn({ name: 'specialties' })
  specialties: Specialties[];

  @OneToOne(() => Address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  address: string;
}

export default Specialist;

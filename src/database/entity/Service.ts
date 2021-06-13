import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Client from './Client';
import Specialist from './Specialist';
import ServiceState from './StateService';

@Entity('services')
class Service extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'timestamp', nullable: false })
  scheduleDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  serviceDate: Date;

  @OneToOne(() => Client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  client: Client;

  @OneToOne(() => Specialist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  specialist: Specialist;

  @OneToOne(() => ServiceState, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  serviceState: ServiceState;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Service;

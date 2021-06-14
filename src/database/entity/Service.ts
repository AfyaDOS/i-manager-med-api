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
import ServiceState from './StateService';

@Entity('services')
class Service extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'timestamp', nullable: false })
  scheduleDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  serviceDate: Date;

  @ManyToOne(() => Client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  client: Client;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @ManyToOne(() => Specialist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  specialist: Specialist;

  @ManyToOne(() => ServiceState, {
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

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export enum EState {
    "AGENDADO", 
    "REALIZADO",
    "CANCELADO",
  }
  
  
  @Entity('servicestate')
  class ServiceState extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
  
    @Column({
      type: 'enum',
      enum: EState,
    })
    state: EState;
  
    @CreateDateColumn()
    created_at?: Date;
  
    @UpdateDateColumn()
    updated_at?: Date;
  }
  
  export default ServiceState;
  
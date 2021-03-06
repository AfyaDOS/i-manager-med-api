import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Address from './Address';
import BloodType from './BloodType';

@Entity('clients')
class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'decimal', nullable: false, unique: true })
  cpf: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'decimal', nullable: false })
  phone: number;

  @Column({ type: 'decimal', nullable: true })
  cellphone: number;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: true })
  gender: string;

  @OneToOne(() => Address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => BloodType, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  bloodtype: BloodType;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Client;

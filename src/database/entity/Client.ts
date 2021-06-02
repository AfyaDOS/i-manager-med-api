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

  @Column({ type: 'text', nullable: false })
  email: string;

  @OneToOne(() => Address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  address: Address;

  @OneToOne(() => BloodType, {
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

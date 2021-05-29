import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'text', nullable: false })
  city: string;

  @Column({ type: 'text', nullable: false })
  state: string;

  @Column({ type: 'text', nullable: false })
  street: string;

  @Column({ type: 'text', nullable: false })
  district: string;

  @Column({ type: 'decimal', nullable: false })
  numberOf: number;

  @Column({ type: 'decimal', nullable: false })
  postcode: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

}

export default Address;

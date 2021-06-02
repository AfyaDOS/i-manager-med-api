import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EBlood {
  "A+", 
  "A-",
  "B+", 
  "B-", 
  "O+", 
  "O-", 
  "AB+",
  "AB-",
}

@Entity('bloodtype')
class BloodType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    type: 'enum',
    enum: EBlood,
  })
  typeOf: EBlood;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default BloodType;

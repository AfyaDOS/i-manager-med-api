// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity('clients')
// class Client {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'long', nullable: false, unique: true })
//   cpf: number;

//   @Column({ type: 'text', nullable: false })
//   name: string;

//   @Column({ type: 'long', nullable: false })
//   phone: number;

//   @Column({ type: 'text', nullable: false })
//   email: string;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }

// export default Client;

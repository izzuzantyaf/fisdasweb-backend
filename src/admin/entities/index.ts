import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Admin {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_admin',
  })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @Unique('UQ_admin_username', ['username'])
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Organigram {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_organigram',
  })
  id: number;

  @Column({ type: 'text', nullable: true })
  url?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

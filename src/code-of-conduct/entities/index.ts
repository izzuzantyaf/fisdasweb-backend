import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CodeOfConduct {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_code_of_conduct',
  })
  id: number;

  @Column({ type: 'text', nullable: true })
  link: string | null;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LabModule {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_lab_module',
  })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  code: string;

  @Column({ type: 'text', nullable: true })
  pretask_link: string | null;

  @Column({ type: 'boolean', default: false })
  pretask_is_published: boolean;

  @Column({ type: 'text', nullable: true })
  video_link: string | null;

  @Column({ type: 'boolean', default: false })
  video_is_published: boolean;

  @Column({ type: 'text', nullable: true })
  simulator_link: string | null;

  @Column({ type: 'boolean', default: false })
  simulator_is_published: boolean;

  @Column({ type: 'text', nullable: true })
  journal_cover_link: string | null;

  @Column({ type: 'boolean', default: false })
  journal_cover_is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

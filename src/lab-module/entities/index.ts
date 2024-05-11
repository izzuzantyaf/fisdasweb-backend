import { Language } from 'src/common/constants';
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

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  code: string;

  @Column({ type: 'enum', enum: Language })
  language: `${Language}`;

  @Column({ type: 'text', nullable: true })
  pretask_url?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  is_pretask_visible: boolean;

  @Column({ type: 'text', nullable: true })
  video_url?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  is_video_visible: boolean;

  @Column({ type: 'text', nullable: true })
  simulator_url?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  is_simulator_visible: boolean;

  @Column({ type: 'text', nullable: true })
  journal_cover_url?: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  is_journal_cover_visible: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

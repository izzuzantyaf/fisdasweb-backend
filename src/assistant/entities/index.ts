import { AssistantLevel } from 'src/assistant/constants';
import { Gender } from 'src/common/constants';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class Assistant {
  @PrimaryGeneratedColumn('increment', {
    primaryKeyConstraintName: 'PK_assistant',
  })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  line_id?: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: AssistantLevel,
  })
  level: AssistantLevel;

  @Column({ type: 'text', nullable: true })
  feedback_url?: string;

  @Column({ type: 'text', nullable: true })
  image_url?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

import { ASSISTANT_LEVEL } from 'src/assistant/constants';
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

  @Column({ type: 'text' })
  code: string;

  @Column({
    type: 'enum',
    enum: Object.values(ASSISTANT_LEVEL),
    nullable: true,
  })
  level: `${(typeof ASSISTANT_LEVEL)[keyof typeof ASSISTANT_LEVEL]}`;

  @Column({ type: 'text', nullable: true })
  line_id: string | null;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}

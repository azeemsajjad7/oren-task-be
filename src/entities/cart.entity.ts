import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { users_user } from './users_user.entity';

@Entity()
export class cart {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => users_user, (users_user) => users_user.id)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user_: users_user;

  @Column('jsonb', { name: 'items', nullable: true })
  items: object | null;

  @Column('boolean', { name: 'active', default: true })
  active: boolean;
}

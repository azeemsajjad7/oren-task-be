import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { users_user } from './users_user.entity';

@Entity()
export class mail {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => users_user, (users_user) => users_user.id)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user_: users_user;

  @Column('character varying', {
    name: 'email_gateway',
    length: 100,
  })
  email_gateway: string;

  @Column('jsonb', { name: 'email_response', nullable: true })
  email_response: object | null;

  @Column('timestamp with time zone', { name: 'created_on' })
  created_on: Date;

  @Column('timestamp with time zone', { name: 'updated_on' })
  updated_on: Date | null;
}

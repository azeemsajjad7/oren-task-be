import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { mail } from './mail.entity';

@Entity()
export class users_user {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'username',
    length: 100,
    nullable: true,
  })
  username: string;

  @Column('character varying', { name: 'email', length: 100, unique: true })
  email: string;

  @Column('character varying', { name: 'password', length: 200 })
  password: string;

  @Column('jsonb', { name: 'address', nullable: true })
  address: object | null;

  @Column('timestamp with time zone', { name: 'last_login', nullable: true })
  last_login: Date;

  @Column('timestamp with time zone', { name: 'created_on' })
  created_on: Date;

  @Column('timestamp with time zone', { name: 'updated_on' })
  updated_on: Date | null;

  @Column('boolean', { name: 'active' })
  active: boolean;

  @OneToMany((type) => mail, (mail) => mail.user_) mails: mail[];
}

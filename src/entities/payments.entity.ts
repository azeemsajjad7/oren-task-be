import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class payments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'order_id', length: 100, unique: true })
  order_id: string;

  @Column('character varying', {
    name: 'payment_gateway',
    length: 100,
  })
  payment_gateway: string;

  @Column('jsonb', { name: 'payment_response', nullable: true })
  payment_response: object | null;

  @Column('character varying', { name: 'status', length: 100 })
  status: string;

  @Column('timestamp with time zone', { name: 'created_on' })
  created_on: Date;

  @Column('timestamp with time zone', { name: 'updated_on' })
  updated_on: Date | null;
}

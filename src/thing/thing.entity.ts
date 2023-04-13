import {} from '@nestjs/typeorm';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'thing',
})
export class Thing {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'pk_thing_id',
  })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'numeric' })
  count: number;

  @CreateDateColumn({ type: 'text' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'text' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'text' })
  deletedAt: Date;
}

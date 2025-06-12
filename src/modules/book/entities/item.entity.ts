import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Item {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column()
  author: string;

  @Column()
  summary: string;

  @Column()
  publisher: string;

  @Column({ default: false })
  reading: boolean;

  @Column()
  page_count: number;

  @Column({ default: 0, nullable: true })
  read_page: number;

  @Column()
  year: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}

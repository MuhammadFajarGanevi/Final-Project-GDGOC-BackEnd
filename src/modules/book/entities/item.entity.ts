import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reading } from 'src/modules/reading/entities/reading.entity';

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

  @Column()
  page_count: number;

  @Column()
  year: number;

  @OneToMany(() => Reading, (reading) => reading.item)
  readings: Reading[];

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}

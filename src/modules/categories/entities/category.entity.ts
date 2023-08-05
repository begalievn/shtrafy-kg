import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Categories extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  nameKG: string;
}

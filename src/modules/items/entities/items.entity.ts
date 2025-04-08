import { Categories } from 'src/common/enums';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'items' })
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Categories, nullable: false })
  category: Categories;

  @Column({ type: 'varchar', nullable: false })
  item_name: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn({ name: 'user' })
  user: User;
}

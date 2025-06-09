import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { RoleKeys, Roles } from '../types/user.type';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    type: 'varchar',
    length: 25,
    name: 'user_name',
    nullable: true,
    default: null,
    unique: true,
  })
  userName: string;

  @Column({ type: 'text', nullable: true, default: null })
  avatar: string;

  @Column({ type: 'enum', enum: Roles, nullable: false, default: Roles.Reader })
  role: RoleKeys;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
    name: 'is_active',
  })
  isActive: boolean;
}

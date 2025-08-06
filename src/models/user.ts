import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne
} from "typeorm";

import { Expose, Type, Exclude } from "class-transformer";

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}


@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email!: string;

  @Column({ nullable: false })
  @Exclude()
  password_hash!: string;

  @Column({ type: "uuid"})
  invited_by?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}







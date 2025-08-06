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

export enum TodoStatus {
  TODO = "todo",
  IN_PROGRESS = "in progress",
  ON_HOLD= "on hold",
  DONE = "done",
  WILL_NOT_DO= "will not do"

}

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH= "high",
  CRITICAL= "critical"
}

@Entity('todos')
export class Todo {
    
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  title!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  description!: string;

  @Column({ type: "enum", enum: Priority, })
  priority: Priority;

  @Column({ type: "uuid", default: false })
  invited_by?: string;

  @Column({ type: "enum", enum: TodoStatus})
  status!: TodoStatus;
   
  @Column({type:"date"})
  expected_completion_at: Date;

  @Column({type:"uuid"})
  user_id: string;

  @Column({type:"boolean"})
  is_deleted: boolean;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}







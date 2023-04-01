import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("todo")
export class Todo extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	text: string;

	@Column({ default: false })
	isCompleted: boolean;
}

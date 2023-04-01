import { Repository } from "typeorm";
import { Todo } from "./../entities/Todo";
import AppDataSource from "../database/connection";
import { v4 as uuidv4 } from "uuid";

interface ITodoRequest {
	id?: string;
	text: string;
	isCompleted: boolean;
}

class TodoService {
	private todos: Todo[] = [];

	async create(data: ITodoRequest) {
		const todo = new Todo();
		todo.id = uuidv4();
		todo.text = data.text;
		todo.isCompleted = data.isCompleted || false;
		this.todos.push(todo);
		return todo;
	}

	async findOne(id: string) {
		const todo = this.todos.filter((todo) => todo.id === id);
		return todo;
	}

	async findAll() {
		const todo = this.todos;
		return todo;
	}

	async update(id: string) {
		const todo = this.todos.filter((todo) => todo.id === id);
		todo[0].isCompleted = !todo[0].isCompleted;
		return todo;
	}

	async delete(id: string) {
		const todo = this.todos.filter((todo) => todo.id === id);
		this.todos = this.todos.filter((todo) => todo.id !== id);
		return todo;
	}
}

export default new TodoService();

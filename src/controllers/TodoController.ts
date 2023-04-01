import { Request, Response } from "express";
import { DataSource, Repository, Unique } from "typeorm";
import { v4 } from "uuid";
import TodoService from "../services/TodoService";
import AppDataSource from "../database/connection";
import { Todo } from "../entities/Todo";

interface ITodoRequest {
	id?: string;
	text: string;
	isCompleted: boolean;
}

class TodoController {
	async create(request: Request, response: Response) {
		const { text, isCompleted } = request.body;

		const todo = await TodoService.create({
			text,
			isCompleted,
		});

		return response.status(201).json(todo);
	}

	async findOne(request: Request, response: Response) {
		const { id } = request.params;

		const todo = await TodoService.findOne(id);

		return response.status(200).json(todo);
	}
	async findAll(request: Request, response: Response) {
		const todos = await TodoService.findAll();

		return response.status(200).json(todos);
	}

	async update(request: Request, response: Response) {
		const { id } = request.params;
		const { text, isCompleted } = request.body;

		const todo = await TodoService.findOne(id);

		if (!todo) {
			return response.status(404).json({
				message: "Todo not found",
			});
		}

		const updatedTodo = await TodoService.update(id);

		return response.status(200).json(updatedTodo);
	}

	async delete(request: Request, response: Response) {
		const { id } = request.params;

		const todo = await TodoService.findOne(id);

		if (!todo) {
			return response.status(404).json({
				message: "Todo not found",
			});
		}

		TodoService.delete(id);

		return response.status(200).json({
			message: "Todo deleted",
		});
	}

	async findActive(request: Request, response: Response) {
		const todo = await TodoService.findAll();

		const activeTodos = todo.filter((todo) => todo.isCompleted === false);

		return response.status(200).json(activeTodos);
	}

	async findCompleted(request: Request, response: Response) {
		const todo = await TodoService.findAll();

		const completedTodos = todo.filter((todo) => todo.isCompleted === true);

		return response.status(200).json(completedTodos);
	}
}

export default new TodoController();

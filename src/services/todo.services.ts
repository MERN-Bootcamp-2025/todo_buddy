
import { PostgresDataSource } from "../config/database";
import { Todo } from "../models/todo";
import {  TodoAddDTO, TodoUpdateDTO } from "../dto/todo.dto";
import { Like, Between } from 'typeorm';

const todoRepository = PostgresDataSource.getRepository(Todo);

export class TodoService {


  static async AddTodo(todoDto: TodoAddDTO) {
    const todo = new Todo();
    console.log("todo",todo);
    todo.title = todoDto.title;
    todo.description = todoDto.description;
    todo.status = todoDto.status;
    todo.priority = todoDto.priority;
    todo.expected_completion_at = todoDto.expected_completion_at;
    todo.user_id = todoDto.user_id;

    const savedTodo = await todoRepository.save(todo);

    return savedTodo;
  }


static async softDeleteTodo(id: string, userId: string) {
  const todo = await todoRepository.findOne({ where: { id, user_id: userId } });

  if (!todo) {
    throw new Error("Todo not found");
  }

  todo.is_deleted = true;
  await todoRepository.save(todo);
  return { message: "Todo soft deleted" };
}

static async updateTodo(id: string,userId: string, dto:TodoUpdateDTO) {
  const todo = await todoRepository.findOne({where: {
          id,
          user_id: userId,
          is_deleted: false,
        }, });
console.log("todo",todo);
  if (!todo) {
    throw new Error("Todo not found");
  }
  const response=await todoRepository.save(dto);
  return { message: "Todo update sucessfully",response };
}

 static async getTodoById(
    userId: string,
    options: {
      page: number;
      limit: number;
      status?: string;
      priority?: string;
      title?: string;
      from_date?: string;
      to_date?: string;
    }
  ) {
    const { page, limit, status, priority, title, from_date, to_date } = options;

    const query = todoRepository.createQueryBuilder("todo");

    query.where("todo.user_id = :userId", { userId });
    query.andWhere("todo.is_deleted = false");

    if (status) {
      query.andWhere("todo.status = :status", { status });
    }

    if (priority) {
      query.andWhere("todo.priority = :priority", { priority });
    }

    if (title) {
      query.andWhere("LOWER(todo.title) LIKE :title", {
        title: `%${title.toLowerCase()}%`,
      });
    }

    if (from_date) {
      query.andWhere("todo.expected_completion_at >= :from_date", { from_date });
    }

    if (to_date) {
      query.andWhere("todo.expected_completion_at <= :to_date", { to_date });
    }

    query.skip((page - 1) * limit).take(limit);

    const [todos, totalItems] = await query.getManyAndCount();

    return {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      todos,
    };
  }

static async getTodos(
  options: {
    page: number;
    limit: number;
    status?: string;
    priority?: string;
    title?: string;
    from_date?: string;
    to_date?: string;
  }
) {
  const { page, limit, status, priority, title, from_date, to_date } = options;


  const where: any = { is_deleted: false };

  if (status) where.status = status;
  if (priority) where.priority = priority;


  const findOptions: any = {
    where,
    skip: (page - 1) * limit,
    take: limit,
  };

  const filters = [];


  if (title) {
    filters.push({
      ...where,
      title: Like(`%${title.toLowerCase()}%`),
    });
  }

  if (from_date || to_date) {
    filters.push({
      ...where,
      expected_completion_at: Between(
        from_date || new Date(0),
        to_date || new Date()
      ),
    });
  }

  if (filters.length > 0) {
    findOptions.where = filters.length > 1 ? { ...where, ...filters[0] } : filters[0];
  }

  const [todos, totalItems] = await todoRepository.findAndCount(findOptions);

  return {
    page,
    limit,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    todos,
  };
}

  static async updatePartialTodo(
    userId: string,
    todoId: string,
    dto: Partial<TodoAddDTO>
  ): Promise<Todo | null> {
    const todo = await todoRepository.findOneBy({
      id: todoId,
      user_id: userId,
      is_deleted: false,
    });

    if (!todo) return null;

    Object.assign(todo, dto); 
    if (dto.expected_completion_at) {
      todo.expected_completion_at = new Date(dto.expected_completion_at);
    }

    return await todoRepository.save(todo);
  }
  

}

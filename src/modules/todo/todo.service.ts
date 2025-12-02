import { pool } from "../../config/db";

const createTodo = async (user_id: string, title: string, description: string, completed: boolean, due_date: string) => {
    return await pool.query(
        'INSERT INTO todos (user_id, title, description, completed, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, title, description, completed, due_date]
    );
}

const getAllTodos = async () => {
    return await pool.query('SELECT * FROM todos');
}

const getTodoById = async (todoId: string) => {
    return await pool.query('SELECT * FROM todos WHERE id = $1', [todoId]);
}

const updateTodo = async (todoId: string, user_id: string, title: string, description: string, completed: boolean, due_date: string) => {
    return await pool.query(
        `UPDATE todos SET user_id = $1, title = $2, description = $3, completed = $4, due_date = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
        [user_id, title, description, completed, due_date, todoId]
    );
}

const deleteTodo = async (todoId: string) => {
    return await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [todoId]);
}

export const todoService = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
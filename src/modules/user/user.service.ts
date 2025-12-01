import { pool } from "../../config/db";


const createUser = async (name: string, email: string, phone: string, age: number, address: string) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, phone, age, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, phone, age, address]
    );

    return result;
}

export const userService = {
    createUser,
};
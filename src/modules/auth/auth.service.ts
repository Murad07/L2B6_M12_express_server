import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rows.length === 0) {
        return null; // User not found
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return false; // Password is incorrect
    }


    const token = jwt.sign(
        {
            name: user.name,
            role: user.role,
            email: user.email,
            id: user.id
        },
        config.jwt_secret,
        {
            expiresIn: '1h'
        }
    );

    return { token, user } // Return the token and user result;

}

export const AuthService = {
    loginUser
}
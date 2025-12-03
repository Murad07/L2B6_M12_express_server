import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rows.length === 0) {
        return null; // User not found
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    console.log("Password match:", match, user);

    if (!match) {
        return false; // Password is incorrect
    }

    const secret: string = "my2233###YYYYYYYmd5secretKey"
    const token = jwt.sign(
        {
            name: user.name,
            email: user.email,
            id: user.id
        },
        secret,
        {
            expiresIn: '1h'
        }
    );

    console.log(token);
    return { token, user } // Return the token and user result;

}

export const AuthService = {
    loginUser
}
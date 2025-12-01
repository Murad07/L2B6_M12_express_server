import express, { Request, Response } from 'express';
import fs from 'fs';
import config from './config';
import initDB, { pool } from './config/db';



const app = express()
const port = config.port;

app.use(express.json());



initDB().catch(console.error);

// logger middleware
const logger = app.use((req: Request, res: Response, next) => {
    const logMessage = `${req.method} ${req.path} - ${new Date().toISOString()}\n`;

    fs.appendFile('logger.txt', logMessage, (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
    });

    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Next Level Developer!')
})

// User CRUD endpoints go here
app.post('/users', async (req: Request, res: Response) => {
    const { name, email, phone, age, address } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, phone, age, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, phone, age, address]
        );

        console.log('User inserted:', result.rows[0]);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: result.rows[0]
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

})


app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})

app.get('/users/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})

app.put('/users/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, email, phone, age, address } = req.body;

    try {
        const result = await pool.query(
            `UPDATE users SET name = $1, email = $2, phone = $3, age = $4, address = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
            [name, email, phone, age, address, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})

app.delete('/users/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})


// Todo CRUD endpoints go here
app.post('/todos', async (req: Request, res: Response) => {
    const { user_id, title, description, completed, due_date } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO todos (user_id, title, description, completed, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, title, description, completed, due_date]
        );

        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: result.rows[0]
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

})

app.get('/todos', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})

app.get('/todos/:id', async (req: Request, res: Response) => {
    const todoId = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM todos WHERE id = $1', [todoId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})

app.put('/todos/:id', async (req: Request, res: Response) => {
    const todoId = req.params.id;
    const { user_id, title, description, completed, due_date } = req.body;

    try {
        const result = await pool.query(
            `UPDATE todos SET user_id = $1, title = $2, description = $3, completed = $4, due_date = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
            [user_id, title, description, completed, due_date, todoId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})

app.delete('/todos/:id', async (req: Request, res: Response) => {
    const todoId = req.params.id;

    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [todoId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

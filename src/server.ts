import express, { Request, Response } from 'express';
import config from './config';
import initDB, { pool } from './config/db';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routes';



const app = express()
const port = config.port;

app.use(express.json());



initDB().catch(console.error);



app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Next Level Developer!')
})

// User CRUD endpoints go here
app.use('/users', userRoutes);


// Todo CRUD endpoints go here
app.use('/todos', todoRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

require('dotenv').config()
import express from 'express'
import { Request, Response, Express } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors'
import { signUp, login } from './controllers/auth.controller';
// import { authenticate } from './middlewares/auth';


const app: Express = express();
const port: number = 5000;

// --------------------------------------------------------



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.get('/status', async (req: Request, res: Response) => {
    res.send("Node server is running")
})

// -------------------------------------------------------



app.post('/auth/signup', signUp)
app.post('/auth/login', login)

// -----------------------------------------------------
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

export default app;
require('dotenv').config()
import express from 'express'
import { Request, Response, Express } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors'
import swaggerDocs from './utils/swagger.utils';
import { routes } from './routes';


const app: Express = express();
const port: number = 5000;

// --------------------------------------------------------



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.get('/status', async (req: Request, res: Response) => {
    res.send("Node server is running")
})

// -----------------------------------------------------

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        routes(app);
        swaggerDocs(app, port);
    })
}

export default app;
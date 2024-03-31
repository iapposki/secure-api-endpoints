import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {version} from '../package.json';

const options : swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'API Docs',
            version
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ["./routes.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Docs in json format
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-type', 'application/json')
        res.send(swaggerSpec);
    })
    console.log(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;
import { Express } from 'express';
import { signUp, login } from './controllers/auth.controller';
import { authenticate } from './middlewares/auth.middleware';
import { getEntries } from './controllers/apiData.controller';

export const routes = (app:Express) => {
    /**
     * @openapi
     *  /auth/signup:
     *  post:
     *      description: This endpoint allows users to register a new account by providing their "name", "email", "password", and "confirmPassword".
     *      summary: Register a new user
     *      requestBody:
     *          description: User registration details
     *          required: true
     *          content: 
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required: 
     *                          - name
     *                          - email
     *                          - password
     *                          - confirmPassword
     *                      properties:
     *                          name:
     *                              type: string
     *                              default: randomname
     *                          email:
     *                              type: string
     *                              default: randomemail
     *                          password:
     *                              type: string
     *                              default: randompassword
     *                          confirmPassword:
     *                              type: string
     *                              default: randompassword
     *      responses:
     *          201:
     *              description: User created successfully
     *          400:
     *              description: Bad request or insufficient information provided
     *          500:
     *              description: Internal server error
     *      security: []
     */
    app.post('/auth/signup', signUp)

    /**
     * @openapi
     *  /auth/login:
     *  post:
     *      description: This endpoint allows users to login and get an authentication token by providing their "email" and "password".
     *      summary: Login user
     *      requestBody:
     *          description: User login details
     *          required: true
     *          content: 
     *              application/json:
     *                  schema:
     *                      type: object
     *                      required: 
     *                          - email
     *                          - password
     *                      properties:
     *                          email:
     *                              type: string
     *                              default: randomemail
     *                          password:
     *                              type: string
     *                              default: randompassword
     *      responses:
     *          200:
     *              description: Logged in successfully
     *          400:
     *              description: Email or password missing
     *          401:
     *              description: Invalid credentials
     *          500:
     *              description: Internal server error
     *      security: []
     */
    app.post('/auth/login', login)

    /**
     * @openapi
     *  /entries:
     *  get:
     *      description: This endpoint allows users to retrieve entries based on various filters such as title, description, authentication type, HTTPS support, CORS support, and category. Note - Auth token is required to access endpoint
     *      summary: Retrieves entries based on specified filters 
     *      parameters: 
     *          - name: title
     *            in: query
     *            type: string
     *            required: false
     *            description:  name of entry (matches via substring - i.e. "at" would return "cat" and "atlas")
     *          - name: description
     *            in: query
     *            type: string
     *            required: false
     *            description: description of entry (matches via substring)
     *          - name: auth
     *            in: query
     *            type: string
     *            required: false
     *            description: auth type of entry (can only be values matching in project or null)
     *          - name: https
     *            in: query
     *            type: bool
     *            required: false
     *            description: return entries that support HTTPS or not (true/false)
     *          - name: cors
     *            in: query
     *            type: string
     *            required: false
     *            description: CORS support for entry ("yes", "no", or "unknown")
     *          - name: category
     *            in: query
     *            type: string
     *            required: false
     *            description: return entries of a specific category
     *      responses:
     *          200: 
     *              description: Successfully retrieved entry data
     *          400: 
     *              description: Some error occured while retrieving entry data
     */
    app.get('/entries', authenticate, getEntries)
}
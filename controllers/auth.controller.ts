import { createUser, validateUsernamePassword } from "../services/auth.service";
import {Request, Response} from 'express';

declare global { namespace Express { interface Request { userDetails?: any } } }

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).json({ msg: 'Email or password missing' });
    } else {
        try {
            const response = await validateUsernamePassword(email, password);
            if (response && response.pass) {
                res.status(200).json({ msg: 'Login successful', token: response.token });
            } else {
                res.status(401).json({ msg: 'Invalid credentials' });
            }
        } catch (error: any) {
            res.status(500).json({ msg: 'Something Failed' });
        }
    }
}

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body;
    var condition = true;
    if (!(name && email && password && confirmPassword)) {
        res.status(400).json({ msg: 'Insufficient information' });
        condition = false;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        res.status(400).json({ msg: 'Passwords do not match' });
        condition = false;
    }
    if (condition) {
        try {
            const token = await createUser({ name, email, password });
            res.status(201).json({ msg: 'User created successfully', token: token });
        } catch (error: any) {
            console.log(error.stack);
            res.status(500).json({ msg: 'Something Failed' });
        }
    }
};
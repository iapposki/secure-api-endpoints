import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateToken = async (
	name: string,
	email: string,
	expiry: string | number = 300,
) => {
	const token = jwt.sign({ name, email}, config.authSecret, {
		expiresIn: expiry,
	});
	return token;
};
import prisma from "./prisma.service";
import { Md5 } from "ts-md5";
import * as jwt from 'jsonwebtoken';
import {config} from '../config/index';
import { User } from "@prisma/client";

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

export const createUser = async (userDetails: any) => {
	await prisma.user.create({data: {...userDetails, password: Md5.hashStr(userDetails.password),},});
	const token = await generateToken(userDetails.name, userDetails.email, "USER");
	return token;
};

export const getUserByEmail = async (email: string) => {
	const record: User | null = await prisma.user.findFirst({ where: { email: email } });
	return record;
};

export const validateUsernamePassword = async (email: string, password: string) => {
	const user: User | null = await prisma.user.findFirst({ where: { email: email } });
	if (user && user.password === Md5.hashStr(password)) {
		const token = await generateToken(user.name, email);
		return { pass: true, token: token };
	}
	return false;
};
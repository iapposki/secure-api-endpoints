import prisma from "./prisma.service";
import { Md5 } from "ts-md5";
import { User } from "@prisma/client";
import { generateToken } from "../utils/jwt.utils";

export const createUser = async (userDetails: any) => {
	await prisma.user.create({data: {...userDetails, password: Md5.hashStr(userDetails.password),},});
	const token = await generateToken(userDetails.name, userDetails.email);
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
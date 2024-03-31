import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from '../config';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	var { token } = req.query;
	var tempToken: any = token;
    if (!token) {
        const tokenAuthHeader = req.header["token"];
        tempToken = tokenAuthHeader && (tokenAuthHeader as string).split(" ")[1];
    }
	if (!token) {
		return res.status(401).json({
				msg: "Authentication token not provided."
			});
	}
	try {
		const { name, email} = jwt.verify(tempToken, config.authSecret) as jwt.JwtPayload;
		if (req.userDetails) {
			throw new Error("Someone tried to hack.")
		}
		req.userDetails = { name, email};
		next();
	} catch (error: any) {
		if (error.name === "TokenExpiredError") {
            res.status(401).json({msg: "Unauthorized! Authentication token has expired. Please login again."});
		} else {
			console.log(error.stack);
			res.status(401).json({ msg: "Unauthorized" });
		}
	}
};
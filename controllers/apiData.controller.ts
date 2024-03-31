import { Request, Response } from "express";
import { config } from "../config";

export const getEntries = async (req: Request, res: Response) => {
    const {title='', description='', auth='', https='', cors='', category=''} = req.query;
    var requestUrl = config.apiUrl;
    requestUrl = requestUrl+'entries?'+new URLSearchParams({
        title:title as string,
        description:description as string,
        auth:auth as string,
        https:https as string,
        cors:cors as string,
        category:category as string
    })
    const response = await fetch(requestUrl)
    if (!response.ok) {
            res.status(400).json({msg: "An error occured while fetching data."})
        }
    const data = await response.json();
    res.status(201).json({msg: data})
}
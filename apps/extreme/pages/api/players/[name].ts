// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Player, removePlayer} from '../../../server/Player';
import initMiddleware from "../../../lib/init-middleware";
import {body, validationResult} from "express-validator";
import validateMiddleware from "../../../lib/validate-middleware";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "DELETE":
            await removePlayer(req.query.name as string)
            res.status(200).send('');
            break;
        default:
            res.status(405).json({error: "Not allowed"});
            break;
    }
}

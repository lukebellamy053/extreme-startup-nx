// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getPlayers, Player} from '../../../server/Player';
import initMiddleware from "../../../lib/init-middleware";
import {body, validationResult} from "express-validator";
import validateMiddleware from "../../../lib/validate-middleware";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            console.log("Got question", {question: req.query.q})
            res.status(200).json(getPlayers());
            break;

        default:
            res.status(405).json({error: "Not allowed"});
            break;
    }
}

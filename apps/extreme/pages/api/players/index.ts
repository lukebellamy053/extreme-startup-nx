// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getPlayers, newPlayer, Player} from '../../../server/Player';
import initMiddleware from "../../../lib/init-middleware";
import {body, validationResult} from "express-validator";
import validateMiddleware from "../../../lib/validate-middleware";

interface NewPlayerRequest extends NextApiRequest {
    body: Player
}

const validateBody = initMiddleware(
    validateMiddleware([
        body('name').isString().isLength({min: 1, max: 40}),
        body('host').isString(),
    ], validationResult)
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            res.status(200).json(await getPlayers());
            break;
        case "POST":
            const newPlayerReq: NewPlayerRequest = req;
            await validateBody(newPlayerReq, res)

            const errors = validationResult(newPlayerReq)
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()})
            }

            const newPlayerItem = await newPlayer(newPlayerReq.body)

            res.status(201).json(newPlayerItem)

            break;
        default:
            res.status(405).json({error: "Not allowed"});
            break;
    }
}

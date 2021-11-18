// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getPlayers} from '../../../server/Player';
import {PauseGame, StartGameQueue} from "../bull";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            console.log("Starting a new game")
            await StartGameQueue().then(() => console.log("Game started")).catch(() => console.log("Failed to start game"));
            res.status(203).send('');
            break;
        case "DELETE":
            console.log("Stopping server");
            await PauseGame();
            res.status(200).json(getPlayers());
            break;
        default:
            res.status(405).json({error: "Not allowed"});
            break;
    }
}

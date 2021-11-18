// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {ServerConfig} from "../config";
import {StartGameQueue} from "../bull";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            // SEND THE QUESTION
            StartGameQueue().then(() => console.log("Game started")).catch(() => console.log("Failed to start game"));
            res.status(203).send('');
            break;
        case "DELETE":
            if (ServerConfig.questionInterval) {
                clearInterval(ServerConfig.questionInterval);
                ServerConfig.questionInterval = null;
            }
            break;
        default:
            res.status(405).json({error: "Not allowed"});
            break;
    }
}

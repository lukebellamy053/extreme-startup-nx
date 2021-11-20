// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { removePlayer } from '@extreme-startup/common';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'DELETE':
      await removePlayer(decodeURIComponent(req.query.name as string));
      res.status(200).send('');
      break;
    default:
      res.status(405).json({ error: 'Not allowed' });
      break;
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { BackendApi } from '../../../lib/BackendApi';
import { newPlayer } from '@extreme-startup/common';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(await BackendApi.getPlayers());
      break;
    case 'POST':
      await newPlayer(req.body);
      res.status(201).end();
      break;
    default:
      res.status(405).json({ error: 'Not allowed' });
      break;
  }
}


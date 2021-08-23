/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import { getUser } from '../../../libs/users';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('req.query', req.query);
    const id: string = Array.isArray(req.query.id)
      ? req.query.id[0]
      : req.query.id;
    const user: any = await getUser(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

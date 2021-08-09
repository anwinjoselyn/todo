/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllUsers } from '../../../libs/users';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

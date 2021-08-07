/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import { getUserTodos } from '../../../libs/todos';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = req.query;
    const todos = await getUserTodos(uid);
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error });
  }
};

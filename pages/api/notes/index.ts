/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import { getTodosByType } from '../../../libs/todos';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todos = await getTodosByType('note');
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error });
  }
};

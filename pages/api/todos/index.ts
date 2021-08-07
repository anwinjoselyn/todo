/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllTodos } from '../../../libs/todos';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error });
  }
};

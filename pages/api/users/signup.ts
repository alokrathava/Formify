// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = JSON.parse(req.body);
    const data = {
      name,
      email,
      password,
    };
    try {
      const result = await prisma.user.create({
        data,
      });
      return res.status(200).json({ data: result });
    } catch (err) {
      console.error('err', err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  }
  if (req.method === 'GET') {
    try {
      const result = await prisma.user.findMany();
      return res.status(200).json({ data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  } else {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
}

import axios from 'axios';
import { parse } from 'cookie';
import type { NextApiRequest } from 'next';

export function buildServerAxios(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.accessToken || '';

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: false,
  });
}

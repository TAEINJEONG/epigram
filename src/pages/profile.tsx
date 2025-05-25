import type { GetServerSideProps } from 'next';
import type { NextApiRequest } from 'next';
import { buildServerAxios } from '@/lib/buildServerAxios';

type User = {
  image: string;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  nickname: string;
  id: number;
};

type ProfilePageProps = {
  user: User | null;
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ req }) => {
  const axios = buildServerAxios(req as NextApiRequest);

  try {
    const { data: user } = await axios.get<User>('/users/me');

    return { props: { user } };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default function ProfilePage({ user }: ProfilePageProps) {
  if (!user) return <p>로딩 중…</p>;
  return (
    <div style={{ padding: 24 }}>
      <h1>환영합니다, {user.nickname}님!</h1>
    </div>
  );
}

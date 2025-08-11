import Emotion from '@/components/Emotion';
import Feed from '@/components/Feed';
import Comment from '@/components/Comment';
import more from '@/assets/icon/more-icon.svg';
import Image from 'next/image';
import useSWR from 'swr';
import { CommentResponse } from '@/type/Comment';
import { Me } from '@/type/me';

import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axiosInstance from '@/api/axiosInstance';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['emotion'])),
  },
});

const fetchCommentsApi = async () => {
  const { data } = await axiosInstance.get<CommentResponse>('/comments', {
    params: { limit: 5 },
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};

const fetchMeApi = async () => {
  const { data } = await axiosInstance.get<Me>('/users/me');
  return data;
};

const Main = () => {
  const { data: comments } = useSWR(
    '/comments',
    fetchCommentsApi,
    { refreshInterval: 60000 }, // 60초마다 자동 재요청
  );
  const { data: me } = useSWR('/user/me', fetchMeApi, {
    revalidateOnFocus: false,
  });

  const FeedData = {
    id: 1,
    feedText: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
    author: '앙드레 말로',
    tag: ['나아가야할떄', '꿈을이루고싶을때'],
  };

  const lastestsFeedData = [
    {
      id: 1,
      feedText: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
      author: '앙드레 말로',
      tag: ['나아가야할떄', '꿈을이루고싶을때'],
    },
    {
      id: 2,
      feedText:
        '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지. ',
      author: '파울로 코엘료',
      tag: ['나아가야할떄', '꿈을이루고싶을때'],
    },
    {
      id: 3,
      feedText: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
      author: '앙드레 말로',
      tag: ['나아가야할떄', '꿈을이루고싶을때'],
    },
  ];

  return (
    <div className="flex justify-center py-30">
      <div className="md:max-w-[432px] lg:max-w-[688px] px-6">
        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">오늘의 에피그램</p>
          <Feed feed={FeedData} />
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">오늘의 감정은 어떤가요?</p>
          <div className="flex justify-center">
            <Emotion />
          </div>
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">최신 에피그램</p>
          {lastestsFeedData.map((feed) => (
            <Feed key={feed.id} feed={feed} />
          ))}

          <div className="w-full flex justify-center pt-[72px]">
            <button className="flex items-center border py-3 px-10 border-line-200 rounded-[100px] cursor-pointer">
              <Image src={more} className="mr-2" alt="더보기 아이콘" />
              <span className="text-md-m lg:text-xl-m lg:font-medium text-blue-500">
                에피그램 더보기
              </span>
            </button>
          </div>
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">최신 댓글</p>
          <div className="-mx-6">
            {comments?.list?.map((comment) => (
              <Comment key={comment?.id} Comment={comment} me={me} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

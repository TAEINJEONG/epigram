import Emotion from '@/components/Emotion';
import Feed from '@/components/Feed';
import Comment from '@/components/Comment';
import more from '@/assets/icon/more-icon.svg';
import Image from 'next/image';
import useSWR from 'swr';
import { CommentResponse } from '@/type/Comment';
import { Epigram } from '@/type/feed';
import { Me } from '@/type/me';
import useSWRInfinite from 'swr/infinite';

import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axiosInstance from '@/api/axiosInstance';
import { EpigramListResponse } from '@/type/EpigramList';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['emotion'])),
  },
});

const fetchFeedApi = async () => {
  const { data } = await axiosInstance.get<Epigram>('/epigrams/today');
  return data;
};

const PAGE_SIZE = 5;

const feedsFetcher = (url: string) =>
  axiosInstance.get<EpigramListResponse>(url).then((r) => r.data);

const getFeedsKey = (index: number, prev: EpigramListResponse | null) => {
  // 직전 페이지의 nextCursor가 null이면 종료
  if (prev && prev.nextCursor == null) return null;

  const params = new URLSearchParams();
  params.set('limit', String(PAGE_SIZE));

  const cursor = index === 0 ? undefined : prev?.nextCursor;
  if (cursor != null) params.set('cursor', String(cursor));

  return `/epigrams?${params.toString()}`;
};

const commentsFetcher = (url: string) =>
  axiosInstance.get<CommentResponse>(url).then((r) => r.data);

const getCommentsKey = (index: number, prev: CommentResponse | null) => {
  if (prev && prev.nextCursor == null) return null;

  const params = new URLSearchParams();
  params.set('limit', String(PAGE_SIZE));

  const cursor = index === 0 ? undefined : prev?.nextCursor;
  if (cursor != null) params.set('cursor', String(cursor));

  return `/comments?${params.toString()}`;
};

const fetchMeApi = async () => {
  const { data } = await axiosInstance.get<Me>('/users/me');
  return data;
};

const Main = () => {
  const { data: feed } = useSWR('/epigrams/today', fetchFeedApi, { revalidateOnFocus: false });
  const {
    data: feedPages,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<EpigramListResponse>(getFeedsKey, feedsFetcher, {
    revalidateFirstPage: false,
  });

  const latestFeeds = feedPages?.flatMap((p) => p.list) ?? [];
  const reachedEnd = feedPages ? feedPages[feedPages.length - 1]?.nextCursor == null : false;

  // const { data: comments } = useSWR('/comments', fetchCommentsApi, { refreshInterval: 120000 });

  const {
    data: commentPages,
    size: commentSize,
    setSize: setCommentSize,
    isValidating: isCommentValidating,
  } = useSWRInfinite<CommentResponse>(getCommentsKey, commentsFetcher, {
    revalidateFirstPage: false,
  });

  const latestComments = commentPages?.flatMap((c) => c.list) ?? [];
  const commentReachedEnd = commentPages
    ? commentPages[commentPages.length - 1]?.nextCursor == null
    : false;

  const { data: me } = useSWR('/user/me', fetchMeApi, {
    revalidateOnFocus: false,
  });

  return (
    <div className="flex justify-center py-30">
      <div className="md:max-w-[432px] lg:max-w-[688px] px-6">
        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">오늘의 에피그램</p>
          {feed ? <Feed feed={feed} /> : null}
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">오늘의 감정은 어떤가요?</p>
          <div className="flex justify-center">
            <Emotion />
          </div>
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">최신 에피그램</p>

          {latestFeeds.map((f) => (
            <div className="pb-4" key={f.id}>
              <Feed feed={f} />
            </div>
          ))}

          <div className="w-full flex justify-center pt-[72px]">
            {!reachedEnd && (
              <button
                className="flex items-center border py-3 px-10 border-line-200 rounded-[100px] cursor-pointer disabled:opacity-50"
                onClick={() => setSize(size + 1)}
                disabled={isValidating || reachedEnd}
              >
                <Image src={more} className="mr-2" alt="더보기 아이콘" />
                <span className="text-md-m lg:text-xl-m lg:font-medium text-blue-500">
                  {isValidating ? '불러오는 중…' : '에피그램 더보기'}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">최신 댓글</p>
          <div className="-mx-6">
            {latestComments?.map((comment) => (
              <Comment key={comment?.id} Comment={comment} me={me} />
            ))}
          </div>

          <div className="w-full flex justify-center pt-[72px]">
            {!commentReachedEnd && (
              <button
                className="flex items-center border py-3 px-10 border-line-200 rounded-[100px] cursor-pointer disabled:opacity-50"
                onClick={() => setCommentSize(commentSize + 1)}
                disabled={isCommentValidating || commentReachedEnd}
              >
                <Image src={more} className="mr-2" alt="더보기 아이콘" />
                <span className="text-md-m lg:text-xl-m lg:font-medium text-blue-500">
                  {isCommentValidating ? '불러오는 중…' : '최신 댓글 더보기'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

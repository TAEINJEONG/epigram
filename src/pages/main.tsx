import Image from 'next/image';

import Emotion from '@/components/Emotion';
import Feed from '@/components/Feed';
import Comment from '@/components/Comment';
import more from '@/assets/icon/more-icon.svg';

import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTodayEpigram } from '@/hooks/useTodayEpigram';
import { useInfiniteEpigrams } from '@/hooks/useEpigrams';
import { useInfiniteComments } from '@/hooks/useComments';
import { useMe } from '@/hooks/useMe';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['emotion'])),
  },
});

const Main = () => {
  const { data: epigram } = useTodayEpigram();
  const {
    list: latestFeeds,
    hasNextPage: hasMoreEpigrams,
    fetchNextPage: fetchEpigramNextPage,
    isFetchingNextPage: isFetchingEpigramNextPage,
    reachedEnd: noMoreEpigrams,
  } = useInfiniteEpigrams();

  const {
    list: latestComments,
    hasNextPage: hasMoreComment,
    fetchNextPage: fetchCommentNextPage,
    isFetchingNextPage: isFetchingCommentPage,
    reachedEnd: noMoreComments,
  } = useInfiniteComments();

  const { data: me } = useMe();

  return (
    <div className="flex justify-center py-21 sm:py-23 lg:py-47">
      <div className="md:max-w-[432px] lg:max-w-[688px] px-6">
        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">오늘의 에피그램</p>
          {epigram ? <Feed feed={epigram} /> : null}
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
            {hasMoreEpigrams && !noMoreEpigrams && (
              <button
                className="flex items-center border py-3 px-10 border-line-200 rounded-[100px] cursor-pointer disabled:opacity-50"
                onClick={() => fetchEpigramNextPage()}
                disabled={isFetchingEpigramNextPage}
              >
                <Image src={more} className="mr-2" alt="더보기 아이콘" />
                <span className="text-md-m lg:text-xl-m lg:font-medium text-blue-500">
                  {isFetchingEpigramNextPage ? '불러오는 중…' : '에피그램 더보기'}
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
            {hasMoreComment && !noMoreComments && (
              <button
                className="flex items-center border py-3 px-10 border-line-200 rounded-[100px] cursor-pointer disabled:opacity-50"
                onClick={() => fetchCommentNextPage()}
                disabled={isFetchingCommentPage}
              >
                <Image src={more} className="mr-2" alt="더보기 아이콘" />
                <span className="text-md-m lg:text-xl-m lg:font-medium text-blue-500">
                  {isFetchingCommentPage ? '불러오는 중…' : '최신 댓글 더보기'}
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

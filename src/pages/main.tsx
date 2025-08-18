import Image from 'next/image';

import Emotion from '@/components/Emotion';
import Feed from '@/components/Feed';
import Comment from '@/components/Comment';
import more from '@/assets/icon/more-icon.svg';
import epigramMore from '@/assets/icon/epigram-more-icon.svg';
import topArrow from '@/assets/icon/top-arrow-icon.svg';

import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useTodayEpigram } from '@/hooks/useTodayEpigram';
import { useInfiniteEpigrams } from '@/hooks/useEpigrams';
import { useInfiniteComments } from '@/hooks/useComments';
import { useMe } from '@/hooks/useMe';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['emotion', 'main', 'comment'])),
  },
});

const Main = () => {
  const { t } = useTranslation('main');

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
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">{t('today')}</p>
          {epigram ? <Feed feed={epigram} /> : null}
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">{t('today_question')}</p>
          <div className="flex justify-center">
            <Emotion />
          </div>
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">{t('latest')}</p>

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
                <Image src={more} className="mr-2" alt={t('more_icon')} aria-hidden="true" />
                <span className="text-md-m lg:text-xl-m lg:font-medium text-blue-500">
                  {isFetchingEpigramNextPage ? t('loading') : t('more')}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="pb-35">
          <p className="pb-6 text-lg-sb lg:text-2xl-sb">{t('latest_comment')}</p>
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
                <Image src={more} className="mr-2" alt={t('more_icon')} aria-hidden="true" />
                <span className="text-md-m lg:text-xl-m lg:font-medium text-blue-500">
                  {isFetchingCommentPage ? t('loading') : t('more_comment')}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="fixed right-6 bottom-16 flex flex-col items-end gap-2">
        <button
          className="
            flex
            py-3 px-[14px] text-md-sb
            lg:py-4 lg:px-5 lg:text-xl-sb
          bg-blue-900 rounded-[100px] text-blue-100
          "
        >
          <Image
            src={epigramMore}
            alt={t('create')}
            width={24}
            height={24}
            className="mr-1"
            aria-hidden="true"
          />
          {t('create')}
        </button>
        <button
          className="flex justify-center items-center w-16 h-16 bg-blue-900 rounded-full text-blue-100"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('top')}
        >
          <Image src={topArrow} alt={t('top')} aria-hidden="true" width={22} height={12} />
        </button>
      </div>
    </div>
  );
};

export default Main;

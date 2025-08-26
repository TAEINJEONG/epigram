import Image from 'next/image';

import more from '@/assets/icon/more-icon.svg';

import FeedSkeleton from '@/components/Feed/FeedSkeleton';
import { QUERY_KEYS } from '@/lib/QUERY_KEYS';
import { listEpigrams } from '@/services/epigrams';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useInfiniteEpigrams } from '@/hooks/useEpigrams';
import Feed from '@/components/Feed';
import nextI18NextConfig from '../../next-i18next.config';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const qc = new QueryClient();

  await qc.prefetchInfiniteQuery({
    queryKey: QUERY_KEYS.epigrams(6),
    queryFn: ({ pageParam }) =>
      listEpigrams({ cursor: pageParam === null ? undefined : (pageParam as number), limit: 6 }),
    initialPageParam: null,
  });

  return {
    props: {
      dehydratedState: dehydrate(qc),
      ...(await serverSideTranslations(locale ?? 'ko', ['feed'], nextI18NextConfig)),
    },
    revalidate: 60,
  };
};

const FeedPage = () => {
  const { t } = useTranslation('feed');

  const {
    list: latestFeeds,
    hasNextPage: hasMoreEpigrams,
    fetchNextPage: fetchEpigramNextPage,
    isFetchingNextPage: isFetchingEpigramNextPage,
    reachedEnd: noMoreEpigrams,
    isLoading: isEpigramsLoading,
  } = useInfiniteEpigrams(6);

  return (
    <div className="flex justify-center">
      <div className="px-6 pt-[92px] lg:pt-[200px] lg:max-w-[1200px] md:max-w-[600px] w-full">
        <p className="mb-6 lg:mb-10 text-lg-sb lg:text-2xl-sb">{t('feed')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 lg:gap-[30px] lg:gap-y[10px]">
          {isEpigramsLoading
            ? [1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index}>
                  <FeedSkeleton />
                </div>
              ))
            : latestFeeds.map((f) => (
                <div className="md:h-[180px] lg:h-[260px] h-full" key={f.id}>
                  <Feed feed={f} className="h-full" />
                </div>
              ))}

          {isFetchingEpigramNextPage &&
            [1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index}>
                <FeedSkeleton />
              </div>
            ))}
        </div>

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
    </div>
  );
};

export default FeedPage;

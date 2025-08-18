import noteBg from '@/assets/images/feed-bg.svg';
import { Epigram } from '@/type/feed';
import Link from 'next/link';

type feedProps = {
  feed: Epigram;
};

const Feed = ({ feed }: feedProps) => {
  return (
    <Link href={`/epigrams/${feed.id}`} prefetch={false}>
      <div className="font-iro">
        <div
          className="py-[21px] px-[22px] shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)] rounded-[16px] bg-blue-100"
          style={{ backgroundImage: `url(${noteBg?.src ?? noteBg})` }}
        >
          <p>{feed?.content}</p>
          <p className="text-right pt-5 text-blue-400">- {feed?.author} -</p>
        </div>
        <div className="mt-2 text-blue-400 text-right">
          {feed?.tags?.map((tag, index) => (
            <span key={index} className="mr-2">
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Feed;

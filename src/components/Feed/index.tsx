import noteBg from '@/assets/images/feed-bg.svg';
import { FeedType } from '@/type/feed';

type feedProps = {
  feed: FeedType;
};

const Feed = ({ feed }: feedProps) => {
  return (
    <div className="font-iro">
      <div
        className="py-[21px] px-[22px] shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)] rounded-[16px]"
        style={{ backgroundImage: `url(${noteBg?.src ?? noteBg})` }}
      >
        <p>{feed?.feedText}</p>
        <p className="text-right pt-5 text-blue-400">- {feed?.author} -</p>
      </div>
      <div className="mt-2 text-blue-400 text-right">
        {feed?.tag?.map((tag, index) => (
          <span key={index} className="mr-2">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Feed;

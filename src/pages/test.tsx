import Feed from '@/components/Feed';

const Test = () => {
  const feedDatas = [
    {
      id: 1,
      feedText: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
      author: '앙드레 말로',
      tag: ['나아가야할떄', '꿈을이루고싶을때'],
    },
  ];

  return (
    <div className="p-4">
      <div className="max-w-[744px]">
        {feedDatas.map((feed) => (
          <Feed key={feed.id} feed={feed} />
        ))}
      </div>
    </div>
  );
};

export default Test;

const FeedSkeleton = () => {
  return (
    <div className="flex flex-col items-end w-full lg:w-[640px]">
      <div className="py-[21px] px-[22px] w-full h-30 md:h-36 lg:h-37 mb-2 shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)] rounded-[16px] bg-blue-300 animate-pulse"></div>
      <div className=" w-[250px] h-[40px] rounded-[16px] bg-blue-200"></div>
    </div>
  );
};

export default FeedSkeleton;

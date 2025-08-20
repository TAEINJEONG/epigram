const CommentSkeleton = () => {
  return (
    <div className="flex items-start py-4 px-6 md:py-6 xl:py-[35px] w-full max-w-[640px] border-t border-t-line-200 animate-pulse">
      <div className="mr-[16px] h-12 w-12 bg-blue-300 animate-pulse rounded-full" />

      <div className="flex-1">
        <div className="mb-2 md:mb-3 xl:mb-4 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-300 animate-pulse w-22 h-[18px] md:h-6 lg:h-[26px] rounded-[12px]"></div>
            <div className="bg-blue-300 animate-pulse w-11 h-[18px] md:h-6 lg:h-[26px] rounded-[12px]"></div>
          </div>
        </div>

        <p className="w-full h-16 bg-blue-300 animate-pulse rounded-[12px]"></p>
      </div>
    </div>
  );
};

export default CommentSkeleton;

import type { Comment as CommentModel } from '@/type/Comment';
import Image from 'next/image';

type Props = { Comment: CommentModel };

const Comment = ({ Comment }: Props) => {
  return (
    <div className="flex py-4 px-6 md:py-6 xl:py-[35px] w-full max-w-[640px] border-t border-t-line-200">
      <Image
        src={Comment?.writer?.image}
        alt="사용자 이미지"
        width={48}
        height={48}
        className="w-12 h-12 aspect-square rounded-full mr-4"
      />
      <div>
        <div className="flex justify-between w-full mb-2 md:mb-3 xl:mb-4">
          <div className="flex text-black-300">
            <p className="mr-2 text-xs-r md:text-md-r xl:text-lg-r">{Comment?.writer?.nickname}</p>
            <span className="text-xs-r md:text-md-r xl:text-lg-r">1시간전</span>
          </div>
          <div className="text-xs-r md:text-md-r xl:text-lg-r">
            <span className="mr-4 underline underline-offset-0 text-black-600">수정</span>
            <span className="underline underline-offset-0 text-error">삭제</span>
          </div>
        </div>
        <p className="text-md-r md:text-lg-r xl:text-xl-r text-black-700">{Comment?.content}</p>
      </div>
    </div>
  );
};

export default Comment;

import Image from 'next/image';
import { useModalStore, type ProfileProps } from '@/store/modalStore';
import userIcon from '@/assets/icon/user-icon.svg';

const ProfileModal = ({ nickname, image }: ProfileProps) => {
  const { close } = useModalStore();
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button className="text-gray-500 " onClick={close}>
          ✕
        </button>
      </div>
      <div className="flex flex-col items-center gap-6">
        {image ? (
          <Image
            src={image}
            alt={`${nickname} 프로필`}
            width={44}
            height={44}
            className="rounded-full object-cover aspect-square"
          />
        ) : (
          <div className="h-11 w-11 rounded-full overflow-hidden flex items-end justify-center bg-blue-200">
            <Image src={userIcon} alt="사용자 아이콘" width={32} height={32} />
          </div>
        )}
        <div>
          <p className="text-lg-sb text-black-400 md:text-xl-sb">{nickname}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

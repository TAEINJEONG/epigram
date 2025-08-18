import type { Comment as CommentModel } from '@/type/Comment';
import type { Me } from '@/type/me';
import Image from 'next/image';
import dayjs from '@/lib/dayjs';
import { useEffect, useState } from 'react';
import userIcon from '@/assets/icon/user-icon.svg';
import { useModalStore } from '@/store/modalStore';
import axiosInstance from '@/api/axiosInstance';
import { useSWRConfig } from 'swr';
import { useTranslation } from 'next-i18next';

type Props = { Comment: CommentModel; me?: Me };

const Comment = ({ Comment, me }: Props) => {
  const { t } = useTranslation('comment');

  const [, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const ago = dayjs(Comment.createdAt).fromNow();
  const canManage = me?.id === Comment.writer.id;

  const { open, confirm, showAlert } = useModalStore();
  const { mutate } = useSWRConfig();

  const openProfile = () =>
    open('profile', {
      userId: Comment.writer.id,
      nickname: Comment.writer.nickname,
      image: Comment.writer.image ?? null,
    });

  const handleDelete = async () => {
    const ok = await confirm({
      title: t('confirm_title'),
      message: t('confirm_body'),
      okText: t('delete_action'),
      cancelText: t('cancel'),
    });
    if (!ok) return;
    await axiosInstance.delete(`/comments/${Comment.id}`);
    mutate('/comments');

    await showAlert({
      title: t('comment_deleted'),
      okText: t('confirm'),
    });
  };

  return (
    <div className="flex py-4 px-6 md:py-6 xl:py-[35px] w-full max-w-[640px] border-t border-t-line-200">
      <button
        type="button"
        onClick={openProfile}
        className="mr-4 h-12 w-12 rounded-full overflow-hidden flex items-end justify-center bg-blue-200"
        aria-label={t('view_author_profile')}
      >
        {Comment.writer.image ? (
          <Image
            src={Comment.writer.image}
            alt={`${Comment.writer.nickname}` + t('profile')}
            width={48}
            height={48}
            className="h-12 w-12 object-cover"
          />
        ) : (
          <Image src={userIcon} alt={t('user_icon')} width={32} height={32} />
        )}
      </button>

      <div className="flex-1">
        <div className="mb-2 md:mb-3 xl:mb-4 flex w-full justify-between">
          <div className="flex text-black-300 items-center gap-2">
            <button type="button" onClick={openProfile} className="text-left">
              <span className="text-xs-r md:text-md-r xl:text-lg-r">{Comment.writer.nickname}</span>
            </button>
            <span className="text-xs-r md:text-md-r xl:text-lg-r" suppressHydrationWarning>
              {ago}
            </span>
          </div>

          {canManage && (
            <div className="text-xs-r md:text-md-r xl:text-lg-r">
              <button className="mr-4 underline underline-offset-0 text-black-600">
                {t('edit')}
              </button>
              <button
                onClick={handleDelete}
                className="underline underline-offset-0 text-error cursor-pointer"
              >
                {t('delete')}
              </button>
            </div>
          )}
        </div>

        <p className="text-md-r md:text-lg-r xl:text-xl-r text-black-700">{Comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;

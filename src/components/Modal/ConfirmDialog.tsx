import { useModalStore, type ConfirmProps } from '@/store/modalStore';
import alertIcon from '@/assets/icon/alert-icon.svg';
import Image from 'next/image';
import Button from '../Button';

export default function ConfirmDialog({
  title = '댓글을 삭제하시겠어요?',
  message = '댓글은 삭제 후 복구할 수 없어요.',
  okText = '삭제하기',
  cancelText = '취소',
}: ConfirmProps) {
  const { resolve } = useModalStore();
  return (
    <div>
      <div className="flex flex-col items-center">
        <Image src={alertIcon} alt="경고 아이콘" width={44} height={44} className="mb-4" />
        <h2 className="mb-1 text-lg-sb text-black-700">{title}</h2>
        <p className="mb-6 text-md-r text-gray-400">{message}</p>
      </div>
      <div className="flex justify-end gap-3">
        <Button
          size="md"
          className="bg-blue-200 hover:bg-blue-200 active:bg-blue-200 text-black-700 mx-2"
          onClick={() => resolve(false)}
        >
          {cancelText}
        </Button>

        <Button size="md" className="mx-2" onClick={() => resolve(false)}>
          {okText}
        </Button>
      </div>
    </div>
  );
}

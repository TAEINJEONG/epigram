import { useModalStore, type AlertProps } from '@/store/modalStore';
import Button from '../Button';

const AlertDialog = ({ title, okText }: AlertProps) => {
  const { resolve } = useModalStore();
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-6 text-lg-sb text-black-700">{title}</h2>

      <Button size="md" onClick={() => resolve(true)}>
        {okText ?? '확인'}
      </Button>
    </div>
  );
};

export default AlertDialog;

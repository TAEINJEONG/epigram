import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import ConfirmDialog from './ConfirmDialog';
import ProfileModal from './ProfileModal';
import AlertDialog from './AlertDialog';

const ModalRoot = () => {
  const { current, close } = useModalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!current) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [current, close]);

  if (!mounted || !current) return null;

  let panel: React.ReactNode;
  switch (current.type) {
    case 'confirm':
      panel = <ConfirmDialog {...current.props} />;
      break;
    case 'alert':
      panel = <AlertDialog {...current.props} />;
      break;
    case 'profile':
      panel = <ProfileModal {...current.props} />;
      break;
    default:
      return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div
        role="dialog"
        aria-modal
        className="relative z-10 w-[min(92vw,360px)] rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {panel}
      </div>
    </div>,
    document.body,
  );
};

export default ModalRoot;

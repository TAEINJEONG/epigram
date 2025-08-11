import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import ConfirmDialog from './ConfirmDialog';
import ProfileModal from './ProfileModal';

export default function ModalRoot() {
  const { current, close } = useModalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  // ESC & 스크롤 락
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

  const panel =
    current.type === 'confirm' ? (
      <ConfirmDialog {...current.props} />
    ) : (
      <ProfileModal {...current.props} />
    );

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
}

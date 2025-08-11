import { create } from 'zustand';

export type ModalType = 'confirm' | 'profile';

export interface ConfirmProps {
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
  danger?: boolean;
}

export interface ProfileProps {
  userId: number;
  nickname: string;
  image?: string | null;
}

type CurrentModal =
  | { type: 'confirm'; props: ConfirmProps }
  | { type: 'profile'; props: ProfileProps }
  | null;

type ModalState = {
  current: CurrentModal;
  // confirm을 Promise<boolean>으로 사용하고 싶을 때 resolver 저장
  _resolver?: (v: boolean) => void;
  open: <T extends ModalType>(
    type: T,
    props: T extends 'confirm' ? ConfirmProps : ProfileProps,
  ) => void;
  close: () => void;
  confirm: (props: ConfirmProps) => Promise<boolean>;
  resolve: (value: boolean) => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  current: null,
  _resolver: undefined,

  open: (type, props) => set({ current: { type, props } as CurrentModal }),
  close: () => set({ current: null, _resolver: undefined }),

  confirm: (props) =>
    new Promise<boolean>((resolve) => {
      set({ current: { type: 'confirm', props }, _resolver: resolve });
    }),

  resolve: (value) => {
    const r = get()._resolver;
    r?.(value);
    set({ current: null, _resolver: undefined });
  },
}));

import { create } from 'zustand';

export type ModalType = 'confirm' | 'profile' | 'alert';

export interface ConfirmProps {
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
}

export interface ProfileProps {
  userId: number;
  nickname: string;
  image?: string | null;
}

export interface AlertProps {
  title?: string;
  okText?: string;
}

type CurrentModal =
  | { type: 'confirm'; props: ConfirmProps }
  | { type: 'profile'; props: ProfileProps }
  | { type: 'alert'; props: AlertProps }
  | null;

// 각 타입별 props 매핑
type ModalPropsOf<T extends ModalType> = T extends 'confirm'
  ? ConfirmProps
  : T extends 'profile'
    ? ProfileProps
    : T extends 'alert'
      ? AlertProps
      : never;

type ModalState = {
  current: CurrentModal;
  _resolver?: (v?: boolean) => void; // ✅ alert(void)와 confirm(boolean) 동시 호환

  open: <T extends ModalType>(type: T, props: ModalPropsOf<T>) => void;
  close: () => void;

  confirm: (props: ConfirmProps) => Promise<boolean>;
  showAlert: (props: AlertProps) => Promise<void>; // ✅ 누락 추가

  resolve: (value?: boolean) => void;
};

const DEFAULT_ALERT: AlertProps = {
  title: '완료되었습니다',
  okText: '확인',
};

export const useModalStore = create<ModalState>((set, get) => ({
  current: null,
  _resolver: undefined,

  open: (type, props) => {
    // ✅ 이전 대기 프라미스가 있으면 취소 처리
    const prev = get()._resolver;
    prev?.(false);
    set({ current: { type, props } as CurrentModal, _resolver: undefined });
  },

  close: () => {
    // ✅ 닫힐 때도 취소로 resolve
    const r = get()._resolver;
    r?.(false);
    set({ current: null, _resolver: undefined });
  },

  showAlert: (props) =>
    new Promise<void>((resolve) => {
      const prev = get()._resolver;
      prev?.(false);
      set({
        current: { type: 'alert', props: { ...DEFAULT_ALERT, ...props } },
        _resolver: () => resolve(), // 값 없이 resolve
      });
    }),

  confirm: (props) =>
    new Promise<boolean>((resolve) => {
      const prev = get()._resolver;
      prev?.(false);
      set({
        current: { type: 'confirm', props },
        _resolver: (v?: boolean) => resolve(Boolean(v)), // undefined → false
      });
    }),

  resolve: (value) => {
    const r = get()._resolver;
    r?.(value);
    set({ current: null, _resolver: undefined });
  },
}));

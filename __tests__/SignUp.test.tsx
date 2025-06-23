import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '@/pages/signup';
import { useLogin } from '@/hooks/useLogin';
import { useMutation } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/test-utils/test-i18n'; // 커스텀 i18n 테스트 설정

jest.mock('@/api/axiosInstance', () => ({
  post: jest.fn().mockResolvedValue({ data: 'mocked result' }),
}));

jest.mock('@/hooks/useLogin', () => ({
  useLogin: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useMutation: jest.fn(),
  };
});

describe('SignUp Component', () => {
  const mutateMock = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });

    (useLogin as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });

    render(
      <I18nextProvider i18n={i18n}>
        <SignUp />
      </I18nextProvider>,
    );
  });

  it('renders input fields correctly', () => {
    expect(screen.getByPlaceholderText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호 확인')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/닉네임/i)).toBeInTheDocument();
  });

  it('validates and submits form', async () => {
    fireEvent.change(screen.getByPlaceholderText(/이메일/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/닉네임/i), {
      target: { value: 'tester' },
    });

    const button = await screen.findByRole('button', { name: '회원가입' });

    await waitFor(() => expect(button).not.toBeDisabled());

    fireEvent.click(button);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalled();
    });
  });

  it('shows error when passwords do not match', async () => {
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
      target: { value: 'password456' },
    });

    fireEvent.blur(screen.getByPlaceholderText('비밀번호 확인'));
    await waitFor(() => {
      expect(screen.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
    });
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/pages/login';
import { useLogin } from '@/hooks/useLogin';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/test-utils/test-i18n';

jest.mock('@/hooks/useLogin', () => ({
  useLogin: jest.fn(),
}));

describe('LoginForm Component', () => {
  const mutateMock = jest.fn();

  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <LoginForm />
      </I18nextProvider>,
    );
  });

  it('renders email and password inputs and login button', () => {
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('submits login data correctly', async () => {
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'password123' },
    });

    const button = screen.getByRole('button', { name: /로그인/i });

    await waitFor(() => expect(button).not.toBeDisabled());
    fireEvent.click(button);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});

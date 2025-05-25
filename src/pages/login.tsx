import React, { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: 'auto' }}>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? '로그인 중…' : '로그인'}
      </button>
      {mutation.isError && (
        <p style={{ color: 'red' }}>
          {mutation.error.response?.data?.message || '오류가 발생했습니다.'}
        </p>
      )}
    </form>
  );
}

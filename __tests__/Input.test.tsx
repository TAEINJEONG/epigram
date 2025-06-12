import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '@/components/Input';
import visibleIcon from '@/assets/icon/visibility_on.svg';
import inVisibleIcon from '@/assets/icon/visibility_off.svg';

describe('Input 컴포넌트', () => {
  it('기본 placeholder와 disabled 상태를 렌더링한다', () => {
    render(<Input placeholder="이메일 입력" disabled value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('이메일 입력');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('bg-backgorund-100');
  });

  it('errorMessage를 넘기면 에러 텍스트와 경고 클래스가 적용된다', () => {
    render(
      <Input placeholder="이름" errorMessage="필수 입력입니다." value="" onChange={() => {}} />,
    );
    const input = screen.getByPlaceholderText('이름');
    expect(input).toHaveClass('border-error');
    expect(screen.getByText('필수 입력입니다.')).toBeInTheDocument();
  });

  it('type="password" 일 때 가시성 토글 아이콘이 보이고 클릭 시 type이 토글된다', () => {
    render(<Input placeholder="비밀번호" type="password" value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('비밀번호') as HTMLInputElement;

    // 기본은 password
    expect(input.type).toBe('password');
    const eyeOff = screen.getByAltText('보기 아이콘');
    expect(eyeOff).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent(inVisibleIcon.src)),
    );

    // 클릭하면 text
    fireEvent.click(eyeOff);
    expect(input.type).toBe('text');
    const eyeOn = screen.getByAltText('보기 아이콘');
    expect(eyeOn).toHaveAttribute(
      'src',
      expect.stringContaining(encodeURIComponent(visibleIcon.src)),
    );
  });

  it('value와 onChange가 정상적으로 동작한다', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="테스트" value="abc" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('테스트');
    fireEvent.change(input, { target: { value: 'abcd' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('기본 타입(text)일 때는 eye 아이콘이 렌더링되지 않는다', () => {
    render(<Input placeholder="기본" value="" onChange={() => {}} />);
    expect(screen.queryByAltText('보기 아이콘')).toBeNull();
  });

  it('errorMessage, disabled 모두 없으면 hover/focus 클래스가 적용된다', () => {
    render(<Input placeholder="클래스 체크" value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('클래스 체크');
    // hover 분기
    expect(input).toHaveClass('hover:border-blue-500');
    // focus 분기
    expect(input).toHaveClass('focus:border-blue-500');
    // danger 분기가 없어야 함
    expect(input).not.toHaveClass('border-error');
  });
});

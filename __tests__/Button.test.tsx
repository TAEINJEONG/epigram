import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../src/components/Button';

describe('Button 컴포넌트', () => {
  it('기본 렌더링 및 텍스트 출력', () => {
    render(<Button>클릭</Button>);
    const btn = screen.getByRole('button', { name: '클릭' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('bg-[#454545]');
  });

  it('variant="outlined"일 때 border 색상', () => {
    render(<Button variant="outlined">아웃라인</Button>);
    const btn = screen.getByRole('button', { name: '아웃라인' });
    expect(btn).toHaveClass('border-[#454545]');
  });

  it('size="sm"일 때 paddingStyles.sm 적용', () => {
    render(<Button size="sm">작은 버튼</Button>);
    const btn = screen.getByRole('button', { name: '작은 버튼' });
    expect(btn).toHaveClass('py-[9px]');
    expect(btn).toHaveClass('px-4');
    expect(btn).toHaveClass('text-base');
  });

  it('size="3xl"일 때 fixed width 적용', () => {
    render(<Button size="3xl">큰 버튼</Button>);
    const btn = screen.getByRole('button', { name: '큰 버튼' });
    expect(btn).toHaveClass('w-[640px]');
    expect(btn).toHaveClass('text-xl');
  });

  it('disabled 속성 적용 시 비활성 상태', () => {
    render(<Button disabled>비활성</Button>);
    const btn = screen.getByRole('button', { name: '비활성' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('bg-[#CBD3E1]');
  });

  it('onClick 이벤트가 호출되는지 테스트', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    const btn = screen.getByRole('button', { name: '클릭' });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

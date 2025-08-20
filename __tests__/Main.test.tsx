import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from '@/pages/main';
import '@testing-library/jest-dom';

// 1) i18n 훅 모킹 (키 그대로 반환)
jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));

// 2) 하위 컴포넌트 모킹 (가벼운 더미)
jest.mock('@/components/Emotion', () => () => <div data-testid="emotion" />);
jest.mock('@/components/Feed', () => (props: any) => (
  <div data-testid={`feed-${props?.feed?.id ?? 'today'}`}>{props?.feed?.content ?? 'today'}</div>
));
jest.mock('@/components/Comment', () => (props: any) => (
  <div data-testid={`comment-${props?.Comment?.id}`}>{props?.Comment?.text ?? ''}</div>
));

// 3) 데이터 훅 모킹
const mockUseTodayEpigram = jest.fn();
const mockUseInfiniteEpigrams = jest.fn();
const mockUseInfiniteComments = jest.fn();
const mockUseMe = jest.fn();

jest.mock('@/hooks/useTodayEpigram', () => ({
  useTodayEpigram: () => mockUseTodayEpigram(),
}));
jest.mock('@/hooks/useEpigrams', () => ({
  useInfiniteEpigrams: () => mockUseInfiniteEpigrams(),
}));
jest.mock('@/hooks/useComments', () => ({
  useInfiniteComments: () => mockUseInfiniteComments(),
}));
jest.mock('@/hooks/useMe', () => ({
  useMe: () => mockUseMe(),
}));

// 4) 공통 더미 데이터
const todayFeed = { id: 0, content: '오늘의 에피그램 본문' };
const feeds = [
  { id: 1, content: '피드 1' },
  { id: 2, content: '피드 2' },
];
const comments = [
  { id: 11, text: '댓글 1' },
  { id: 12, text: '댓글 2' },
];

function setDefaultMocks() {
  mockUseTodayEpigram.mockReturnValue({ data: todayFeed });
  mockUseInfiniteEpigrams.mockReturnValue({
    list: feeds,
    hasNextPage: true,
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false,
    reachedEnd: false,
  });
  mockUseInfiniteComments.mockReturnValue({
    list: comments,
    hasNextPage: true,
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false,
    reachedEnd: false,
  });
  mockUseMe.mockReturnValue({ data: { id: 999, nickname: 'me' } });
}

beforeEach(() => {
  jest.clearAllMocks();
  // jsdom에서 scrollTo 스텁
  // (최상단 이동 버튼 테스트용)
  // @ts-ignore
  window.scrollTo = jest.fn();
  setDefaultMocks();
});

describe('<Main />', () => {
  test('섹션 타이틀과 오늘의 에피그램/감정 컴포넌트가 렌더링 된다', () => {
    render(<Main />);
    // t('today'), t('today_question'), t('latest'), t('latest_comment')
    expect(screen.getByText('today')).toBeInTheDocument();
    expect(screen.getByText('today_question')).toBeInTheDocument();
    expect(screen.getByText('latest')).toBeInTheDocument();
    expect(screen.getByText('latest_comment')).toBeInTheDocument();

    // 오늘의 에피그램 Feed
    expect(screen.getByTestId('feed-0')).toHaveTextContent('오늘의 에피그램 본문');
    // Emotion 컴포넌트
    expect(screen.getByTestId('emotion')).toBeInTheDocument();
  });

  test('최신 에피그램 목록과 더보기 버튼이 보이고, 클릭 시 fetchNextPage가 호출된다', () => {
    render(<Main />);
    // 목록
    expect(screen.getByTestId('feed-1')).toHaveTextContent('피드 1');
    expect(screen.getByTestId('feed-2')).toHaveTextContent('피드 2');

    // 에피그램 더보기 버튼 (라벨은 t('more') 키)
    const epigramMoreBtn = screen.getByRole('button', { name: /^more$/i });
    expect(epigramMoreBtn).toBeEnabled();

    fireEvent.click(epigramMoreBtn);
    expect(mockUseInfiniteEpigrams.mock.results[0].value.fetchNextPage).toHaveBeenCalledTimes(1);

    // 댓글 더보기 버튼
    const commentMoreBtn = screen.getByRole('button', { name: /more_comment/i });
    fireEvent.click(commentMoreBtn);
    expect(mockUseInfiniteComments.mock.results[0].value.fetchNextPage).toHaveBeenCalledTimes(1);
  });

  test('에피그램 로딩 중일 때 라벨이 t("loading")으로 바뀐다', () => {
    // 로딩 상태로 재정의
    mockUseInfiniteEpigrams.mockReturnValue({
      list: feeds,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: true,
      reachedEnd: false,
    });
    render(<Main />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  test('최신 댓글 목록과 더보기 버튼이 보이고, 클릭 시 fetchNextPage가 호출된다', () => {
    render(<Main />);
    expect(screen.getByTestId('comment-11')).toHaveTextContent('댓글 1');
    expect(screen.getByTestId('comment-12')).toHaveTextContent('댓글 2');

    const moreCommentBtn = screen.getByRole('button', { name: /more_comment/i });
    const { fetchNextPage } = mockUseInfiniteComments.mock.results[0].value;
    fireEvent.click(moreCommentBtn);
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  test('최상단 이동 버튼 클릭 시 window.scrollTo가 호출된다', () => {
    render(<Main />);
    // 버튼 접근성 이름은 이미지 alt의 t('top') 키가 된다
    const topBtn = screen.getByRole('button', { name: /^top$/i });

    fireEvent.click(topBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  test('더보기 버튼은 hasNextPage=false 또는 reachedEnd=true면 숨겨진다', () => {
    mockUseInfiniteEpigrams.mockReturnValue({
      list: feeds,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      reachedEnd: false,
    });
    render(<Main />);
    // “more” 버튼이 없어야 함
    expect(screen.queryByRole('button', { name: /^more$ㅈ/i })).not.toBeInTheDocument();
  });
});

import Input from '@/components/Input';
import { useState } from 'react';

const Join = () => {
  const [value, setValue] = useState<string>('');
  return (
    <div>
      <div>어허</div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="password"
        placeholder="여기는 플레이스 홀더 입니다."
        errorMessage="아니 글쌔 여기 에러가 있당께요?!"
      />
    </div>
  );
};

export default Join;

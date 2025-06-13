import Input from '@/components/Input';
import { useState } from 'react';

const Join = () => {
  const [value, setValue] = useState<string>('');
  return (
    <div className="p-20">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="password"
        placeholder="여기는 플레이스 홀더 입니다."
        errorMessage="에러 메세지"
      />
    </div>
  );
};

export default Join;

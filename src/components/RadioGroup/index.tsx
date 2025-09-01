import * as React from 'react';
import Radio from '../Radio';

type Option = { label: string; value: string; disabled?: boolean };

type RadioGroupProps = {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const RadioGroup = ({ name, options, value, onChange, className = '' }: RadioGroupProps) => {
  return (
    <fieldset className={className}>
      <div className="flex flex-row gap-4 mb-3 lg:mb-4">
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center cursor-pointer">
            <Radio
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={opt.disabled}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;

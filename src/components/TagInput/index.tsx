import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { useTranslation } from 'next-i18next';

type TagInputProps = {
  onChangeTags?: (tags: string[]) => void;
  initialTags?: string[];
};

const TagInput = ({ onChangeTags, initialTags }: TagInputProps) => {
  const { t } = useTranslation('editor');
  const [tags, setTags] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    if (initialTags) setTags(initialTags);
  }, [initialTags]);

  useEffect(() => {
    onChangeTags?.(tags);
  }, [tags, onChangeTags]);

  const add = (raw: string) => {
    if (tags.length >= 3) return;
    const t = raw.trim();
    if (!t) return;
    if (t.length > 10) return;
    if (tags.includes(t)) return;
    setTags((prev) => [...prev, t]);
    setDraft('');
  };

  const removeAt = (i: number) => {
    setTags((prev) => prev.filter((_, idx) => idx !== i));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (tags.length >= 3) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(draft);
      return;
    }

    if (e.key === ',') {
      e.preventDefault();
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (isComposing) {
      setDraft(val);
      return;
    }

    const chunks = val.split(/[\n,]+/).map((s) => s.trim());
    if (chunks.length === 1) {
      setDraft(chunks[0]);
      return;
    }

    const last = chunks.pop() ?? '';
    chunks.filter(Boolean).forEach(add);
    setDraft(last);
  };

  const disabled = tags.length >= 3;

  return (
    <div>
      <Input
        value={draft}
        onChange={onChangeInput}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        maxLength={10}
        placeholder={t('tag_placeholder')}
      />
      {tags.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-800"
        >
          #{t}
          <button
            type="button"
            className="px-1 text-blue-500 hover:text-blue-700"
            onClick={() => removeAt(i)}
            aria-label={`${t} 태그 삭제`}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default TagInput;

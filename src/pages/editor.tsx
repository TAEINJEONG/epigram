import Button from '@/components/Button';
import Input from '@/components/Input';
import RadioGroup from '@/components/RadioGroup';

import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import { EpigramForm, EpigramRequestApi } from '@/type/feed';
import { Controller, useForm } from 'react-hook-form';
import axiosInstance from '@/api/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
import TagInput from '@/components/TagInput';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { toTagNames } from '@/utils/tags';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ko', ['editor'], nextI18NextConfig)),
  },
});

const FeedForm = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<EpigramForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      content: '',
      author: '',
      referenceTitle: '',
      referenceUrl: '',
    },
  });
  const router = useRouter();
  const epigramId = useMemo(() => {
    const q = router.query.id;
    return Array.isArray(q) ? q[0] : q;
  }, [router.query.id]);

  const onChangeTags = useCallback(
    (arr: string[]) => {
      setValue('tags', arr.join(','), { shouldDirty: true, shouldValidate: true });
    },
    [setValue],
  );

  const [initialTags, setInitialTags] = useState<string[] | undefined>();

  const getEpigram = async (id: string) => {
    const { data } = await axiosInstance.get(`/epigrams/${id}`);
    return data;
  };

  const { data: detail, isLoading: isLoadingDetail } = useQuery({
    queryKey: ['epigram', epigramId],
    queryFn: () => getEpigram(epigramId as string),
    enabled: !!epigramId,
  });

  useEffect(() => {
    if (!detail) return;
    const author = (detail.author ?? '').trim();
    const authorMode = author === '알 수 없음' || author === '본인' ? author : '직접 입력';
    const authorValue = authorMode === '직접 입력' ? author : '';

    const names = toTagNames(detail.tags);
    setInitialTags(names);
    reset({
      content: detail.content ?? '',
      authorMode,
      author: authorValue,
      referenceTitle: detail.referenceTitle ?? '',
      referenceUrl: detail.referenceUrl ?? '',
      tags: names.join(','),
    });
  }, [detail, reset]);

  const authorMode = watch('authorMode');

  const createEpigram = useMutation({
    mutationFn: async (data: EpigramRequestApi) => {
      const { data: result } = await axiosInstance.post('/epigrams', data);
      return result;
    },
  });

  const updateEpigram = useMutation({
    mutationFn: async (params: { id: string; body: EpigramRequestApi }) => {
      const { data: result } = await axiosInstance.patch(`/epigrams/${params.id}`, params.body);
      return result;
    },
  });

  const toTagArray = (s?: string) =>
    (s ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

  const onSubmit = async (data: EpigramForm) => {
    const safeAuthor: string =
      data.authorMode === '직접 입력' ? data.author?.trim() || '없음' : data.authorMode;

    const tagsArr = toTagArray(data.tags);

    const payload = {
      content: data.content,
      author: safeAuthor,
      referenceTitle: data.referenceTitle || undefined,
      referenceUrl: data.referenceUrl || undefined,
      tags: tagsArr,
    };

    try {
      if (epigramId) {
        const updated = await updateEpigram.mutateAsync({ id: epigramId, body: payload });
        const id = epigramId ?? updated?.id ?? updated?.epigramId;
        alert('정상적으로 수정되었습니다.');
        router.push(`/epigrams/${id}`);
      } else {
        const created = await createEpigram.mutateAsync(payload);
        const id = created?.id ?? created?.epigramId;
        alert('정상적으로 등록되었습니다.');
        if (id) router.push(`/epigrams/${id}`);
        else router.push('/epigrams');
      }
    } catch {
      alert('오류가 발생했습니다.');
    }
  };

  const { t } = useTranslation('editor');

  return (
    <div className="flex flex-col items-center pt-19 sm:pt-23 lg:pt-47 px-6 w-full">
      <div className="max-w-[640px] w-full">
        <p className="mb-6 w-full text-lg-sb md:text-xl-sb">{t('title')}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 w-full">
            <p className="text-md-sb md:text-lg-sb">
              {t('content')} <span className="text-error">*</span>
            </p>
            <textarea
              className="py-[10px] px-4 w-full h-[132px] lg:h-[148px] border border-blue-300 rounded-[12px]
            text-lg-r lg:text-xl-r placeholder-blue-400 text-black-950 caret-blue-400
            resize-none outline-none
            hover:border hover:border-blue-500 focus:border focus:border-blue-500"
              maxLength={500}
              placeholder={t('content_placeholder')}
              {...register('content', {
                required: '필수 항목입니다.',
                maxLength: { value: 500, message: '500까지 작성 가능합니다.' },
              })}
              aria-invalid={!!errors.content}
            />
            {errors.content && (
              <p className="mt-2 text-right text-sm-m text-error">{errors.content.message}</p>
            )}
          </div>

          <div className="mb-10 w-full">
            <p className="text-md-sb mb-2 md:text-lg-sb">
              {t('author')} <span className="text-error">*</span>
            </p>
            <Controller
              name="authorMode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  name="저자 구분"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: t('enter_directly'), value: '직접 입력' },
                    { label: t('unknown'), value: '알 수 없음' },
                    { label: t('self'), value: '본인' },
                  ]}
                />
              )}
            />

            {authorMode === '직접 입력' && (
              <Input
                placeholder={t('author_placeholder')}
                {...register('author', {
                  required: '저자 이름을 입력해 주세요.',
                  maxLength: { value: 30, message: '30자 이하로 입력해 주세요.' },
                })}
                aria-invalid={!!errors.author}
              />
            )}
            {errors.author && (
              <p className="mt-2 text-right text-sm-m text-error">{errors.author.message}</p>
            )}
          </div>

          <div className="mb-10 w-full">
            <p className="text-md-sb mb-2 md:text-lg-sb">{t('source')}</p>
            <Input
              className="mb-2 lg:mb-4"
              placeholder={t('source_placeholder')}
              {...register('referenceTitle')}
            />
            <Input
              placeholder="URL (ex. https://www.website.com)"
              {...register('referenceUrl', {
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i,
                  message: '유효한 URL 형식이 아닙니다.',
                },
              })}
              aria-invalid={!!errors.referenceUrl}
            />
            {errors.referenceUrl && (
              <p className="mt-2 text-right text-sm-m text-error">{errors.referenceUrl.message}</p>
            )}
          </div>

          <div className="mb-10 w-full">
            <p className="text-md-sb mb-2 md:text-lg-sb">{t('tag')}</p>
            <input type="hidden" {...register('tags')} />
            <TagInput onChangeTags={onChangeTags} initialTags={initialTags} />
          </div>

          <Button
            size="2xl"
            type="submit"
            disabled={!isValid || isLoadingDetail}
            className="w-full"
          >
            {t('submit')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FeedForm;

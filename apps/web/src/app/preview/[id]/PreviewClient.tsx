'use client';

import ContentPreview from '@ui/ContentPreview/ContentPreview';
import { usePreview } from '@ui/hooks/usePreview';

type Props = {
  id: string;
  locale: string;
  initialContent?: any;
};

export default function PreviewClient({ id, locale, initialContent }: Props) {
  const { data: content, error, loading } = usePreview(id, locale, initialContent);

  return (
    <ContentPreview 
      id={id}
      content={content}
      loading={loading}
      error={error}
      locale={locale}
    />
  );
}
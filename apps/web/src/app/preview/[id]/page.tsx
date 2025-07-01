import { client } from '@graphql-sdk/client';
import { AppProvider } from '@ui/AppProvider/AppProvider';
import { notFound } from 'next/navigation';
import PreviewClient from './PreviewClient';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const locale = 'en-US';

export default async function Preview({ params }: Props) {
  const { id } = params;
  
  let initialContent = null;
  try {
    const { data } = await client.Preview({ id, locale });
    initialContent = data?.content;
  } catch (error) {
    // If server-side fetch fails, let client-side handle it
    console.error('Server-side preview fetch failed:', error);
  }

  if (!initialContent) {
    // If no content from server, still render the component
    // The client-side fetch will try to get it
    return (
      <AppProvider>
        <PreviewClient id={id} locale={locale} />
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <PreviewClient id={id} locale={locale} initialContent={initialContent} />
    </AppProvider>
  );
}
import ContentModule from '@ui/ContentModule/ContentModule';
import { client } from '@graphql-sdk/client';

import { AppProvider } from '@ui/AppProvider/AppProvider';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const locale = 'en-US';

export default async function Preview(props: Props) {
  const params = await props.params;
  const { id } = params;
  const { data } = await client.Preview({ id, locale });

  if (!data?.content) {
    return notFound();
  }
  return (
    <AppProvider>
      <ContentModule {...data.content} />
    </AppProvider>
  );
}

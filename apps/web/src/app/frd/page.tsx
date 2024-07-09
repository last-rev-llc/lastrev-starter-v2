import { client } from '@graphql-sdk/client';

import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

import { AppProvider } from '@ui/AppProvider/AppProvider';

import ContentModule from '@ui/ContentModule/ContentModule';

const FRD_KEY = process.env.FRD_KEY;

type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 300;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return { title: 'Functional Requirements Document' };
}

export default async function Page({ params }: Props) {
  if (!FRD_KEY) return notFound();

  const {
    data: { content: pageData }
  } = await client.Preview({
    id: FRD_KEY,
    locale: 'en-US'
  });

  if (!pageData) {
    return notFound();
  }

  return (
    <AppProvider>
      <ContentModule {...pageData} __typename="Page" />
    </AppProvider>
  );
}

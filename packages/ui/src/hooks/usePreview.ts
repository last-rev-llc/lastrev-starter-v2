'use client';

import useSWR from 'swr';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '@graphql-sdk/generated/sdk';

// Create a client-side GraphQL client
const createClient = () => {
  const endpoint =
    typeof window !== 'undefined' ? `${window.location.origin}/api/graphql` : '/api/graphql';

  return getSdk(new GraphQLClient(endpoint));
};

export const usePreview = (id: string, locale: string = 'en-US', initialData?: any) => {
  const { data, error, isLoading, mutate } = useSWR(
    ['preview', id, locale],
    async () => {
      const client = createClient();
      const response = await client.Preview({ id, locale });
      return response.data;
    },
    {
      fallbackData: initialData ? { content: initialData } : undefined,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
      // refreshInterval: 5000 // Refresh every 5 seconds for preview mode
    }
  );

  return {
    data: data?.content || initialData,
    error,
    loading: isLoading,
    mutate
  };
};

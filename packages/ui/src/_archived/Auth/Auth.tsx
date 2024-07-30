'use client';
import React from 'react';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

const Auth = ({ providers }) => {
  if (!providers) return null;

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl');

  const collectionProps = {
    id: '1234',
    __typename: 'Collection',
    variant: 'onePerRow',
    backgroundColor: 'coolGrey',
    itemsVariant: 'iconCenter',
    items: Object.values(providers).map((provider) => ({
      id: `card-auth-${provider.name}`,
      __typename: 'Card',
      variant: 'default',
      media: [
        {
          __typename: 'Media',
          disableInlineSVG: true,
          file: {
            url: `https://authjs.dev/img/providers/${provider.id}.svg`,
            width: 1280,
            height: 720
          },
          title: `Logo for ${provider.name}`
        }
      ],
      title: provider.name,
      // link: {
      //   id: `card-auth-link-${provider.name}`,
      //   __typename: 'Link',
      //   onClick: () => signIn(provider.id)
      // },
      actions: [
        {
          id: `card-auth-action-${provider.name}`,
          __typename: 'Link',
          variant: 'buttonContained',
          onClick: () =>
            signIn(provider.id, {
              callbackUrl: `https://ias-intranet-prod.netlify.app${callbackUrl || '/'}`
            }),
          text: `Login via ${provider.name}`
        }
      ]
    }))
  };

  return (
    <ErrorBoundary>
      <ContentModule {...collectionProps} />
    </ErrorBoundary>
  );
};

export default Auth;

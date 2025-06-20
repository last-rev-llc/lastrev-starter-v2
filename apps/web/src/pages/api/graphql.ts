// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// require('dotenv').config();
import type { NextApiHandler } from 'next';

import { createVercelHandler } from '@last-rev/graphql-cms-core';

import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import lrConfig from 'graphql-sdk/config.serverless';
import { cors } from '../../cors';

const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);

  return await createVercelHandler(
    lrConfig.clone({
      apolloServerOptions: {
        // introspection: false,
        plugins: [
          process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageLocalDefault()
        ]
      }
    })
  )(req, res);
};

export default handler;

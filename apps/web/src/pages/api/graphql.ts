// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// require('dotenv').config();
import type { NextApiHandler } from 'next';

import { createVercelHandler } from '@last-rev/graphql-cms-core';

import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

import lrConfig from 'graphql-sdk/config.serverless';
import { cors } from '../../cors';

const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);

  return await createVercelHandler(
    lrConfig.clone({
      apolloServerOptions: {
        introspection: false,
        plugins: [ApolloServerPluginLandingPageDisabled()]
      }
    })
  )(req, res);
};

export default handler;

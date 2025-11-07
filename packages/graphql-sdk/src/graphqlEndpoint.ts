const deployUrl =
  process.env.DEPLOY_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

// During build phase, use a placeholder endpoint that won't cause connection errors
// The actual GraphQL queries during build should use the serverless config
export const graphqlEndpoint =
  process.env.NEXT_PHASE === 'phase-production-build' || process.env.STAGE === 'build'
    ? (deployUrl ? `${deployUrl}/api/graphql` : 'http://localhost:8888/graphql')
    : !deployUrl
    ? 'http://localhost:8888/graphql'
    : `${deployUrl}/api/graphql`;

export default graphqlEndpoint;

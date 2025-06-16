import gql from 'graphql-tag';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
import { getSeoFieldValue } from './utils/getSeoFieldValue';
import { ApolloContext } from '@last-rev/types';

export const typeDefs = gql`
  extend type ElementForm {
    introText: Text
    header: Header
    footer: Footer
    path: String
    hero: Hero
    contents: [Content]
    breadcrumbs: [Link]
    footerDisclaimerOverride: RichText
    seo: JSON
  }
`;

export const mappers = {
  ElementForm: {
    ElementForm: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      seo: async (form: any, _args: any, ctx: ApolloContext) => {
        return await getSeoFieldValue(form, 'seo', ctx);
      }
    },
    Link: {
      href: pathResolver,
      text: 'title'
    },

    NavigationItem: {
      href: pathResolver,
      text: 'title'
    }
  }
};

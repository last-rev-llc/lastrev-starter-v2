import React from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import Breadcrumbs from '../Breadcrumbs';
import ContentModule from '../ContentModule';
import TwitterIcon from '../Icons/TwitterIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import LinkedinIcon from '../Icons/LinkedinIcon';
import EmailIcon from '../Icons/EmailIcon';
import CopyLinkIcon from '../Icons/CopyLinkIcon';

import type { PageDocumentProps, PageDocumentOwnerState } from './PageDocument.types';
import { type MediaProps } from '../Media';
import { type LinkProps } from '../Link';

const PageDocument = (props: PageDocumentProps) => {
  const ownerState = { ...props };

  const {
    id,
    header,
    footer,
    featuredMedia,
    pubDate,
    title,
    body,
    author,
    relatedItems,
    jsonLd,
    breadcrumbs,
    sidekickLookup,
    hero
  } = props;

  const pathname = usePathname();
  const [shareUrl, setShareUrl] = React.useState('');
  const encodedShareUrl = encodeURIComponent(shareUrl);

  React.useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    setShareUrl(`${origin}${pathname}`);
  }, [pathname]);

  return (
    <>
      {!!jsonLd && (
        <Script type="application/ld+json" id={`pageDocument-${id}-jsonld`}>
          {jsonLd}
        </Script>
      )}

      {header ? <ContentModule {...(header as any)} /> : null}

      <Main component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        {hero ? (
          <ContentModule {...(hero as any)} breadcrumbs={breadcrumbs} />
        ) : (
          <>
            {!!title && (
              <Title component="h1" variant="display1" ownerState={ownerState}>
                {title}
              </Title>
            )}

            {!!pubDate && <PubDate ownerState={ownerState}>{pubDate}</PubDate>}
          </>
        )}

        <ContentOuterGrid ownerState={ownerState}>
          <SideContentWrap ownerState={ownerState}>
            {/* <SideContentInnerWrap ownerState={ownerState}>
              {!!author && (
                <AuthorWrap ownerState={ownerState}>
                  {!!author.mainImage && (
                    <AuthorImageWrap ownerState={ownerState}>
                      <AuthorImage {...author.mainImage} ownerState={ownerState} />
                    </AuthorImageWrap>
                  )}

                  {!!author.name && (
                    <AuthorName ownerState={ownerState} variant="display4">
                      {author.name}
                    </AuthorName>
                  )}

                  {!!author.body && (
                    <AuthorSummaryWrap ownerState={ownerState}>
                      <AuthorSummary
                        body={author.body}
                        variant="bodyLarge"
                        __typename="RichText"
                        ownerState={ownerState}
                      />
                    </AuthorSummaryWrap>
                  )}

                  {!!author.socialLinks?.length && (
                    <AuthorSocialLinks ownerState={ownerState}>
                      {author.socialLinks.map((link, index) => (
                        <AuthorSocialLink
                          key={`author-social-link-${index}=${link?.href}`}
                          {...(link as LinkProps)}
                          ownerState={ownerState}
                        />
                      ))}
                    </AuthorSocialLinks>
                  )}
                </AuthorWrap>
              )}

              <ShareLinksWrap ownerState={ownerState}>
                <ShareLinksLabel ownerState={ownerState}>Share</ShareLinksLabel>

                <ShareLinks ownerState={ownerState}>
                  <ShareLink ownerState={ownerState}>
                    <ShareLinkItem
                      __typename="Link"
                      href={`http://www.twitter.com/share?url=${encodedShareUrl}`}
                      target="_blank"
                      icon={TwitterIcon}
                      text="Twitter"
                      ownerState={ownerState}
                    />
                  </ShareLink>

                  <ShareLink ownerState={ownerState}>
                    <ShareLinkItem
                      __typename="Link"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                      target="_blank"
                      icon={FacebookIcon}
                      text="Facebook"
                      ownerState={ownerState}
                    />
                  </ShareLink>

                  <ShareLink ownerState={ownerState}>
                    <ShareLinkItem
                      __typename="Link"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                      target="_blank"
                      icon={LinkedinIcon}
                      text="Linkedin"
                      ownerState={ownerState}
                    />
                  </ShareLink>

                  <ShareLink ownerState={ownerState}>
                    <ShareLinkItem
                      __typename="Link"
                      href={`mailto:?to=&body=${encodedShareUrl}`}
                      target="_blank"
                      icon={EmailIcon}
                      text="Email"
                      ownerState={ownerState}
                    />
                  </ShareLink>

                  <ShareLink ownerState={ownerState}>
                    <ShareLinkItem
                      __typename="Link"
                      target="_blank"
                      icon={CopyLinkIcon}
                      text="Copy Link"
                      ownerState={ownerState}
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                      }}
                    />
                  </ShareLink>
                </ShareLinks>
              </ShareLinksWrap>
            </SideContentInnerWrap> */}
          </SideContentWrap>

          <ContentWrap ownerState={ownerState}>
            {!!body && (
              <Body
                body={body}
                sidekickLookup={sidekickLookup}
                variant="inline"
                __typename="RichText"
                ownerState={ownerState}
              />
            )}
          </ContentWrap>
        </ContentOuterGrid>

        {!!relatedItems && <RelatedItems {...relatedItems} ownerState={ownerState} />}
      </Main>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Main = styled(Box, {
  name: 'PageDocument',
  slot: 'Main',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: PageDocumentOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'PageDocument',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: PageDocumentOwnerState }>``;

const HeaderWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'HeaderWrap',
  overridesResolver: (_, styles) => [styles.headerWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const BreadcrumbsWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'BreadcrumbsWrap',
  overridesResolver: (_, styles) => [styles.breadcrumbsWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const Title = styled(Typography, {
  name: 'PageDocument',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: PageDocumentOwnerState }>``;

const PubDate = styled(Typography, {
  name: 'PageDocument',
  slot: 'PubDate',
  overridesResolver: (_, styles) => [styles.pubDate]
})<TypographyProps & { ownerState: PageDocumentOwnerState }>``;

const Author = styled(Box, {
  name: 'PageDocument',
  slot: 'Author',
  overridesResolver: (_, styles) => [styles.author]
})<{ ownerState: PageDocumentOwnerState }>``;

const AuthorImageWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'AuthorImageWrap',
  overridesResolver: (_, styles) => [styles.authorImageWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const AuthorImage = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'AuthorImage',
  overridesResolver: (_, styles) => [styles.authorImage]
})<{ ownerState: PageDocumentOwnerState }>``;

const AuthorName = styled(Typography, {
  name: 'PageDocument',
  slot: 'AuthorName',
  overridesResolver: (_, styles) => [styles.authorName]
})<{ ownerState: PageDocumentOwnerState }>``;

const FeaturedMediaWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'FeaturedMediaWrap',
  overridesResolver: (_, styles) => [styles.featuredMediaWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const FeaturedMedia = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'FeaturedMedia',
  overridesResolver: (_, styles) => [styles.featuredMedia]
})<{ ownerState: PageDocumentOwnerState }>``;

const ShareLinksWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'ShareLinksWrap',
  overridesResolver: (_, styles) => [styles.shareLinksWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const ShareLinksLabel = styled(Typography, {
  name: 'PageDocument',
  slot: 'ShareLinksLabel',
  overridesResolver: (_, styles) => [styles.shareLinksLabel]
})<{ ownerState: PageDocumentOwnerState }>``;

const ShareLinks = styled(List, {
  name: 'PageDocument',
  slot: 'ShareLinks',
  overridesResolver: (_, styles) => [styles.shareLinks]
})<{ ownerState: PageDocumentOwnerState }>``;

const ShareLink = styled(ListItem, {
  name: 'PageDocument',
  slot: 'ShareLShareLinkinks',
  overridesResolver: (_, styles) => [styles.shareLink]
})<{ ownerState: PageDocumentOwnerState }>``;

const ShareLinkItem = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'ShareLinkItem',
  overridesResolver: (_, styles) => [styles.shareLinkItem]
})<{ href?: string; target?: string; onClick?: any; ownerState: PageDocumentOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: PageDocumentOwnerState }>``;

const RelatedItemsWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'RelatedItemsWrap',
  overridesResolver: (_, styles) => [styles.relatedItemsWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const RelatedItems = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'RelatedItems',
  overridesResolver: (_, styles) => [styles.relatedItems]
})<{ ownerState: PageDocumentOwnerState }>``;

const AuthorWrap = styled(Grid, {
  name: 'PageDocument',
  slot: 'AuthorWrap',
  overridesResolver: (_, styles) => [styles.authorWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const AuthorSummaryWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'AuthorSummaryWrap',
  overridesResolver: (_, styles) => [styles.authorSummaryWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const AuthorSummary = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'AuthorSummary',
  overridesResolver: (_, styles) => [styles.authorSummary]
})<{ ownerState: PageDocumentOwnerState }>``;

const AuthorSocialLinks = styled(Box, {
  name: 'PageDocument',
  slot: 'AuthorSocialLinks',
  overridesResolver: (_, styles) => [styles.authorSocialLinks]
})<{ ownerState: PageDocumentOwnerState }>``;

const AuthorSocialLink = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'AuthorSocialLink',
  overridesResolver: (_, styles) => [styles.AuthorSocialLink]
})<{ ownerState: PageDocumentOwnerState }>``;

const SideContentWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'SideContentWrap',
  overridesResolver: (_, styles) => [styles.sideContentWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const SideContentInnerWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'SideContentInnerWrap',
  overridesResolver: (_, styles) => [styles.sideContentInnerWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

export default PageDocument;

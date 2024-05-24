import { collectionBaseMock } from '../Collection/Collection.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerChildrenNestedMock } from '../Header/Header.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { pageDocumentMock } from '../RichText/RichText.mock';
import { textTitleMock } from '../Text/Text.mock';
import { breadcrumbsBaseMock } from '../Breadcrumbs/Breadcrumbs.mock';
import { personBaseMock } from '../Person/Person.mock';

import { randomId } from '../utils/randomId';

import { PageDocumentVariants, type PageDocumentProps } from './PageDocument.types';
import heroBaseMock from '../Hero/Hero.mock';

const pageDocumentDefaultMock = (override?: Partial<PageDocumentProps>): PageDocumentProps => {
  const relatedItems = collectionBaseMock({ introText: textTitleMock({ title: 'Related Items' }) });
  relatedItems.items = relatedItems.items?.slice(0, 3);

  const baseMock: PageDocumentProps = {
    id: randomId(),
    __typename: 'PageDocument',
    variant: PageDocumentVariants.default,
    header: headerChildrenNestedMock(),
    footer: footerBaseMock(),
    title: 'This is the PageDocument Title',
    pubDate: new Date().toString(),
    body: pageDocumentMock(),
    featuredMedia: mediaBaseImageMock(),
    breadcrumbs: breadcrumbsBaseMock().links,
    author: personBaseMock(),
    relatedItems,
    jsonLd: {}
  };

  return { ...baseMock, ...override };
};

export const pageDocumentBaseMock = ({ ...override } = {}) => ({
  ...pageDocumentDefaultMock(override)
});

export const pageDocumentWithHeroMock = ({ ...override } = {}) => {
  const defaultMock = pageDocumentDefaultMock(override);

  return {
    ...defaultMock,
    hero: heroBaseMock({
      title: defaultMock.title,
      subtitle: undefined,
      body: undefined,
      overline: defaultMock.pubDate,
      images: [defaultMock.featuredMedia]
    })
  };
};

export default pageDocumentBaseMock;

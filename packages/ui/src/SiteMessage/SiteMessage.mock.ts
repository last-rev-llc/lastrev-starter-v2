import { richTextMock } from '../RichText/RichText.mock';
import { linkBaseMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

import { randomId } from '../utils/randomId';

import type { SiteMessageProps } from './SiteMessage.types';

const siteMessageDefaultMock = (): SiteMessageProps => {
  return {
    __typename: 'SiteMessage',
    icon: mediaBaseImageMock(),
    link: linkBaseMock(),
    text: richTextMock({ text: 'This is the SiteMessage text' }),
    sidekickLookup: {} // TODO: Mock
  };
};

export const siteMessageBaseMock = (override: Partial<SiteMessageProps> = {}): SiteMessageProps => {
  return {
    ...siteMessageDefaultMock(),
    ...override
  };
};

export default siteMessageBaseMock;

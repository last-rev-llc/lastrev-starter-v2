import PageDocument from './PageDocument';
import { pageDocumentBaseMock, pageDocumentWithHeroMock } from './PageDocument.mock';

export default {
  title: 'Pages/PageDocument',
  component: PageDocument
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...pageDocumentBaseMock() } };
export const WithHero = { args: { ...pageDocumentWithHeroMock() } };

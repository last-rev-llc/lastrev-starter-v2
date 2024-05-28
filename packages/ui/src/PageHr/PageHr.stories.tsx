import PageHr from './PageHr';
import { pagehrBaseMock } from './PageHr.mock';

export default {
  title: 'PageHrs/PageHr General',
  component: PageHr,
  parameters: {
    layout: 'responsive'
  }
  // tags: ['autodocs']
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...pagehrBaseMock()
  }
};

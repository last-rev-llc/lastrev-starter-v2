// import { draftMode } from 'next/headers';
const preview = process.env.CONTENTFUL_USE_PREVIEW === 'true';

export const isPreview = () => {
  return preview;
  // if (!!preview) {
  //   return true;
  // }

  // try {
  //   const { isEnabled } = draftMode();
  //   return !!preview || !!isEnabled;
  // } catch (e) {
  //   console.log('ispreviewerror', e);
  // }

  // return false;
};

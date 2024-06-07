import type { MediaProps, MediaVideoProps, FileProps } from './Media.types';

import { cleanSVG } from '../utils/cleanSVG';
const getSvgContent = (url: string) =>
  fetch(url)
    .then((res) => res.text())
    .then((svgContent) => {
      return cleanSVG(svgContent);
    });

export const defaultFileImageMock = (override?: Partial<FileProps>): FileProps => ({
  url: `https://source.unsplash.com/random/${(override as any)?.width ?? 1280}x${
    override?.height ?? 500
  }?rnd=${Math.random()}`,
  width: '1920',
  height: '1080',
  ...override
});

export const defaultFileSvgMock = (override?: Partial<FileProps>): FileProps => ({
  url: 'https://images.ctfassets.net/imglmb3xms7o/5iTzPfXcBEhIM68upyDSxS/406045a76146d3dbc4ee1c89682abd76/whiteLastRev.svg',
  width: '1280',
  height: '720',
  ...override
});

export const defaultFileVideoMock = (override?: Partial<FileProps>): FileProps => ({
  url: 'LastRev.mp4',
  width: '1280',
  height: '720',
  ...override,
  __typename: 'Asset'
});

const defaultAssetFileMock = (override?: Partial<MediaProps>): Partial<MediaProps> => ({
  file: defaultFileImageMock({ ...override?.file }),
  title: 'This is an asset title',
  ...override
});

const defaultAssetSvgMock = async (
  override?: Partial<MediaProps>
): Promise<Partial<MediaProps>> => {
  const svgContent = await getSvgContent(
    'https://images.ctfassets.net/imglmb3xms7o/5iTzPfXcBEhIM68upyDSxS/406045a76146d3dbc4ee1c89682abd76/whiteLastRev.svg'
  );

  return {
    file: defaultFileSvgMock(),
    svgContent,
    title: 'This is an asset title',
    ...override
  };
};

const defaultAssetVideoMock = (override?: Partial<MediaProps>): Partial<MediaProps> => ({
  file: defaultFileVideoMock(),
  title: 'This is an asset title',
  ...override
});

export const mediaSVGMock = {
  __typename: 'Media',
  file: defaultFileSvgMock(),
  title: 'This is a media  SVG title',
  description: 'This is a media SVG  description'
};

export const mediaExternalSVGMock = {
  __typename: 'Media',
  file: defaultFileSvgMock(),
  disableInlineSVG: true,
  title: 'This is an external SVG  title',
  description: 'This is an external SVG  description'
};

const mediaDefaultMock = () => ({
  id: 'mediaBaseImageMock',
  alt: 'This is the default media alt text',
  __typename: 'Media'
});

const imageDefaultMock = (override?: Partial<MediaProps>): MediaProps => ({
  ...mediaDefaultMock(),
  ...defaultAssetFileMock(override),
  __typename: 'Media'
});

const svgDefaultMock = async (override?: Partial<MediaProps>): Promise<MediaProps> => ({
  ...mediaDefaultMock(),
  ...(await defaultAssetSvgMock(override)),
  __typename: 'Media'
});

const videoDefaultMock = (override?: Partial<MediaProps>): MediaVideoProps => ({
  ...mediaDefaultMock(),
  variant: 'video',
  controls: true,
  file: defaultFileVideoMock({
    ...override?.file
  }),
  __typename: 'Media'
});

export const mediaBaseVideoMock = (override?: Partial<MediaProps>): MediaProps =>
  videoDefaultMock({ ...override });

export const mediaBaseImageMock = (override?: any): MediaProps => imageDefaultMock({ ...override });

export const mediaBaseSvgMock = async (override?: any): Promise<MediaProps> =>
  svgDefaultMock({
    ...override
  });

export const responsiveMediaBaseImageMock = (override?: Partial<MediaProps>): MediaProps => ({
  ...mediaDefaultMock(),
  file: defaultFileImageMock(),
  fileTablet: defaultFileImageMock({ width: '920', height: '613' }),
  fileMobile: defaultFileImageMock({ width: '540', height: '540' }),
  ...override,
  __typename: 'Media'
});

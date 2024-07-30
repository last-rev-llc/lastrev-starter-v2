import type { ImageProps } from './Image.types';

// TODO: Use Media Mock
const imageDefaultMock: ImageProps = {
  src: 'https://picsum.photos/300/300',
  alt: 'This is the image alt text',
  width: 180,
  height: 180,
  className: 'image-class-name',
  testId: 'Image'
  // lazy: false
};

export const imageBaseMock = ({ ...override } = {}): ImageProps => ({
  ...imageDefaultMock,
  ...override
});

export default imageBaseMock;

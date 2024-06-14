import { FrameType } from 'src/enums/frame-type';
import type { FrameT } from 'src/types/frame';

export const blocksTabConfig = [
  {
    title: 'Rectangle',
    frame: { type: FrameType.Rectangle },
    src: '/src/assets/rectangle.png'
  },
  {
    title: 'Circle',
    frame: {
      type: FrameType.Rectangle,
      borderRadius: 9999,
      width: 100,
      height: 100,
    },
    src: '/src/assets/circle.png'
  },
  {
    title: 'Image',
    frame: {
      type: FrameType.Image,
      width: 300,
      height: 200,
    },
    src: '/src/assets/placeholder.png',
  },
  {
    title: 'Text',
    frame: {
      type: FrameType.Rectangle,
      textContent: 'Text',
      backgroundColor: '#00000000',
    },
    src: '/src/assets/text.png'
  },
  {
    title: 'Button',
    frame: { type: FrameType.Button },
    src: '/src/assets/button.png'
  },
  {
    title: 'Range',
    frame: { type: FrameType.Range },
    src: '/src/assets/range.png'
  },
] satisfies Array<{
  title: string;
  frame: Partial<FrameT>;
  src: string;
}>;

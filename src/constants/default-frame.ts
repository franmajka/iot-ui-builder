import { FrameType } from 'src/enums/frame-type';
import type { Frame } from 'src/types/frame';

export const DEFAULT_FRAME: Frame = {
  id: 0,
  type: FrameType.Rectangle,
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  backgroundColor: '#ff0000',
  parent: null
}

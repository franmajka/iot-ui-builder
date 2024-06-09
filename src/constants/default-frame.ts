import { FrameType } from 'src/enums/frame-type';
import type { Frame } from 'src/types/frame';
import placeholder from 'src/assets/placeholder.png';

export const SHARED_FRAME_PROPS = {
  id: 0,
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  rotation: 0,
  borderRadius: 0,
  parent: null
};

export const DEFAULT_RECT_FRAME: Frame<FrameType.Rectangle> = {
  ...SHARED_FRAME_PROPS,
  type: FrameType.Rectangle,
  backgroundColor: '#cccccc',
  textContent: '',
  textColor: '#000000',
  fontSize: 16,
  padding: 0,
  textAlignment: 'center',
  textVerticalAlignment: 'middle',
  textStyle: []
};

export const DEFAULT_IMAGE_FRAME: Frame<FrameType.Image> = {
  ...SHARED_FRAME_PROPS,
  type: FrameType.Image,
  src: placeholder
};

export const defaultFrameMap = {
  [FrameType.Rectangle]: DEFAULT_RECT_FRAME,
  [FrameType.Image]: DEFAULT_IMAGE_FRAME
};

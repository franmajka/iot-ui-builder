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
  parent: null,
  className: '',
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

export const DEFAULT_RANGE_FRAME: Frame<FrameType.Range> = {
  ...SHARED_FRAME_PROPS,
  type: FrameType.Range,
  min: 0,
  max: 1023,
  step: 1,
  thumbColor: '#9C27B0',
  thumbSize: 10,
  trackColor: '#9C27B066',
  height: 10,
  width: 100,
  borderRadius: 9999,
  value: '',
};

export const DEFAULT_BUTTON_FRAME: Frame<FrameType.Button> = {
  ...SHARED_FRAME_PROPS,
  type: FrameType.Button,
  backgroundColor: '#9C27B0',
  textContent: 'Button',
  textColor: '#ffffff',
  fontSize: 16,
  padding: 8,
  textAlignment: 'center',
  textVerticalAlignment: 'middle',
  textStyle: [],
  borderRadius: 4,
};

export const DEFAULT_SWITCH_FRAME: Frame<FrameType.Switch> = {
  ...SHARED_FRAME_PROPS,
  height: 25,
  width: 50,
  borderRadius: 9999,
  type: FrameType.Switch,
  trackInactiveColor: '#cccccc',
  trackActiveColor: '#de99e0',
  thumbInactiveColor: '#ffffff',
  thumbActiveColor: '#9C27B0',
  padding: 4,
  value: '',
};

export const defaultFrameMap = {
  [FrameType.Rectangle]: DEFAULT_RECT_FRAME,
  [FrameType.Image]: DEFAULT_IMAGE_FRAME,
  [FrameType.Range]: DEFAULT_RANGE_FRAME,
  [FrameType.Button]: DEFAULT_BUTTON_FRAME,
  [FrameType.Switch]: DEFAULT_SWITCH_FRAME,
} satisfies Record<FrameType, unknown>;

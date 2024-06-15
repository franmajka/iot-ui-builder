import { FrameType } from 'src/enums/frame-type';
import { imageProperties } from './image-properties';
import { rectangleProperties } from './rectangle-properties';
import { rangeProperties } from './range-properties';
import { switchProperties } from './switch-properties';

export const typeSpecificProperties = {
  [FrameType.Rectangle]: rectangleProperties,
  [FrameType.Image]: imageProperties,
  [FrameType.Range]: rangeProperties,
  [FrameType.Button]: rectangleProperties,
  [FrameType.Switch]: switchProperties,
} satisfies Record<FrameType, unknown>;

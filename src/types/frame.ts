import type { FrameType } from 'src/enums/frame-type';

export type Frame = {
  id: number;
  type: FrameType;
  x: number;
  y: number;
  width: number;
  height: number;
  backgroundColor: string;
  parent?: HTMLElement | null;
}

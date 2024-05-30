import type Konva from 'konva';
import { FrameType } from 'src/enums/frame-type';
import type { KeyOf } from './utils';

export type RectangleFrame = {
  backgroundColor: string;
  textContent: string;
};

export type ImageFrame = {
  src: string;
};

type FrameTypeMap = {
  [FrameType.Rectangle]: RectangleFrame;
  [FrameType.Image]: ImageFrame;
};

export type FrameKonvaMap = {
  [FrameType.Rectangle]: Konva.Rect;
  [FrameType.Image]: Konva.Image;
};

export type Frame<Type extends FrameType = FrameType.Rectangle> = {
  id: number;
  type: Type;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  borderRadius: number;
  parent?: HTMLElement | null;
} & FrameTypeMap[Type];

export type FrameByType<Type extends FrameType> = Type extends Type ? Frame<Type> : never;

export type FrameT = FrameByType<FrameType>;
export type FrameKeys = KeyOf<FrameT>;

export type FrameValue<Key extends FrameKeys> = {
  [Type in FrameType]: Key extends keyof Frame<Type> ? Frame<Type>[Key] : never;
}[FrameType];

export type FrameByKey<Key extends FrameKeys> = {
  [Type in FrameType]: Key extends keyof Frame<Type> ? Frame<Type> : never;
}[FrameType];

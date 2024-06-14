import { FrameType } from 'src/enums/frame-type';
import type { KeyOf } from './utils';

export type FrameHierarchy = {
  [id: number]: FrameHierarchy;
};

export type RectangleFrame = {
  backgroundColor: string;
  textContent: string;
  textColor: string;
  fontSize: number;
  padding: number;
  textAlignment: 'left' | 'center' | 'right' | 'justify';
  textVerticalAlignment: 'top' | 'middle' | 'bottom';
  textStyle: Array<'bold' | 'italic' | 'underline' | 'line-through'>;
};

export type ImageFrame = {
  src: string;
};

export type ButtonFrame = RectangleFrame;

export type RangeFrame = {
  min: number;
  max: number;
  step: number;
  thumbColor: string;
  thumbSize: number;
  trackColor: string;
  value: string;
}

type FrameTypeMap = {
  [FrameType.Rectangle]: RectangleFrame;
  [FrameType.Image]: ImageFrame;
  [FrameType.Range]: RangeFrame;
  [FrameType.Button]: ButtonFrame;
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
  className: string;
  parent?: number | null;
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

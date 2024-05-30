import type { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import type { FrameByKey, FrameKeys, FrameT, FrameValue } from './frame';
import type { KeyOf } from './utils';

export type IconLabel = {
  icon: IconDefinition;
  tooltip: string;
}

export type NumberProperties = {
  [Key in FrameKeys]-?: FrameValue<Key> extends number ? Key : never;
}[FrameKeys];

export type SupportedTypes = 'number' | 'color' | 'text';


export type PropertyConfig<
  Key extends KeyOf<_Frame>,
  Type extends SupportedTypes = SupportedTypes,
  _Frame extends FrameT = FrameByKey<Key>
> = {
  selectedFrame: _Frame;
  type: Type;
  propertyName: Key;
  label: string | IconLabel
  mapValue: (value: string) => _Frame[Key];
  mapDisplayValue: (value: _Frame[Key]) => string;

  // Optional properties
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

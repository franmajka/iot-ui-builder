import type { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import type { FrameByKey, FrameKeys, FrameT, FrameValue } from './frame';
import type { KeyOf, OptionT } from './utils';

export type IconLabel = {
  icon: IconDefinition;
  tooltip: string;
};

export type NumberProperties = {
  [Key in FrameKeys]-?: FrameValue<Key> extends number ? Key : never;
}[FrameKeys];

export type SupportedTypes = 'number' | 'color' | 'text' | 'textarea' | 'segmented-control';

export type PropertyConfig<
  Key extends KeyOf<_Frame>,
  Type extends SupportedTypes = SupportedTypes,
  _Frame extends FrameT = FrameByKey<Key>,
  Value = _Frame[Key]
> = {
  type: Type;
  propertyName: Key;
  label: string | IconLabel;
  mapValue: (value: string) => Value;
  mapDisplayValue?: (value: Value) => string;

  // Optional properties
  options?: OptionT<Value extends (infer T)[] ? T : Value, string | IconLabel>[];
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

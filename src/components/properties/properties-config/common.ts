import { round } from 'lodash';
import type { FrameByKey, FrameT } from 'src/types/frame';
import type { PropertyConfig, SupportedTypes } from 'src/types/property-config';
import type { KeyOf } from 'src/types/utils';

export const rounded = (value: number) => round(value, 2).toString();

export const defaultNumberConfig = {
  className: 'max-w-24 text-right',
  type: 'number',
  mapValue: (value: string) => parseFloat(value) || 0,
  mapDisplayValue: rounded
} as const;

export const rangedNumberConfig = (min?: number, max?: number) => ({
  ...defaultNumberConfig,
  min,
  max,
  mapValue: (value: string) =>
    Math.min(Math.max(parseFloat(value) || 0, min ?? -Infinity), max ?? Infinity)
});

export const createPropertyConfig = <
  Key extends KeyOf<_Frame>,
  Type extends SupportedTypes,
  _Frame extends FrameT = FrameByKey<Key>
>(
  config: Omit<PropertyConfig<Key, Type, _Frame>, 'selectedFrame'>
) => config;

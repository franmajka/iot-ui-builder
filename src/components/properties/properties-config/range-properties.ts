import { createPropertyConfig, defaultNumberConfig, rangedNumberConfig } from './common';

export const rangeProperties = [
  {
    properties: [
      createPropertyConfig({
        ...defaultNumberConfig,
        propertyName: 'min',
        label: 'Min'
      }),
      createPropertyConfig({
        ...defaultNumberConfig,
        propertyName: 'max',
        label: 'Max'
      }),
    ],
  },
  {
    properties: [
      createPropertyConfig({
        ...defaultNumberConfig,
        propertyName: 'step',
        label: 'Step'
      }),
      createPropertyConfig({
        ...rangedNumberConfig(0),
        propertyName: 'thumbSize',
        label: 'Thumb Size'
      }),
    ],
  },
  {
    properties: [
      createPropertyConfig({
        propertyName: 'trackColor',
        label: 'Track Color',
        type: 'color',
        mapValue: (value: string) => value,
        mapDisplayValue: (value: string) => value.toUpperCase()
      }),
      createPropertyConfig({
        propertyName: 'thumbColor',
        label: 'Thumb Color',
        type: 'color',
        mapValue: (value: string) => value,
        mapDisplayValue: (value: string) => value.toUpperCase()
      }),
    ],
  },
  {
    properties: [
      createPropertyConfig({
        propertyName: 'value',
        label: 'Dynamic Value',
        type: 'text',
        placeholder: 'Type here...',
        className: 'w-full',
        mapValue: (value: string) => value,
      }),
    ],
  },
]

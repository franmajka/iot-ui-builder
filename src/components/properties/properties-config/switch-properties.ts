import { createPropertyConfig, rangedNumberConfig } from './common';

export const switchProperties = [
  {
    properties: [
      createPropertyConfig({
        ...rangedNumberConfig(0),
        propertyName: 'padding',
        label: 'Padding'
      }),
    ],
  },
  {
    properties: [
      createPropertyConfig({
        propertyName: 'trackInactiveColor',
        label: 'Track Color (Off)',
        type: 'color',
        mapValue: (value: string) => value,
        mapDisplayValue: (value: string) => value.toUpperCase()
      }),
      createPropertyConfig({
        propertyName: 'trackActiveColor',
        label: 'Track Color (On)',
        type: 'color',
        mapValue: (value: string) => value,
        mapDisplayValue: (value: string) => value.toUpperCase()
      }),
    ],
  },
  {
    properties: [
      createPropertyConfig({
        propertyName: 'thumbInactiveColor',
        label: 'Thumb Color (Off)',
        type: 'color',
        mapValue: (value: string) => value,
        mapDisplayValue: (value: string) => value.toUpperCase()
      }),
      createPropertyConfig({
        propertyName: 'thumbActiveColor',
        label: 'Thumb Color (On)',
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

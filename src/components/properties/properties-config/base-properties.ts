import { round } from 'lodash';
import { faExpand, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { createPropertyConfig, defaultNumberConfig, rangedNumberConfig } from './common';

export const baseProperties = [
  {
    properties: [
      createPropertyConfig({
        ...defaultNumberConfig,
        propertyName: 'x',
        label: 'X'
      }),
      createPropertyConfig({
        ...defaultNumberConfig,
        propertyName: 'y',
        label: 'Y'
      })
    ],
  },
  {
    properties: [
      createPropertyConfig({
        ...rangedNumberConfig(0),
        propertyName: 'width',
        label: 'W'
      }),
      createPropertyConfig({
        ...rangedNumberConfig(0),
        propertyName: 'height',
        label: 'H',
        min: 0
      })
    ],
  },
  {
    properties: [
      createPropertyConfig({
        ...defaultNumberConfig,
        propertyName: 'rotation',
        label: {
          icon: faRotateRight,
          tooltip: 'Rotation'
        },
        mapDisplayValue: (value: number) => {
          const roundedValue = round(value, 2);
          if (roundedValue >= 0) return (roundedValue % 360).toString();
          return ((360 + roundedValue) % 360).toString();
        }
      }),
      createPropertyConfig({
        ...defaultNumberConfig,
        propertyName: 'borderRadius',
        label: {
          icon: faExpand,
          tooltip: 'Corner Radius'
        },
        min: 0
      })
    ],
  },
  {
    order: 1,
    properties: [
      createPropertyConfig({
        propertyName: 'className',
        label: 'Class',
        type: 'text',
        placeholder: 'Type here...',
        mapValue: (value: string) => value,
      }),
    ],
  },
];

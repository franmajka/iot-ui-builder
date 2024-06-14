import { createPropertyConfig } from './common';

export const imageProperties = [
  {
    properties: [
      createPropertyConfig({
        propertyName: 'src',
        label: 'Image URL',
        type: 'text',
        className: 'w-full',
        mapValue: (value: string) => value
      })
    ]
  },
];

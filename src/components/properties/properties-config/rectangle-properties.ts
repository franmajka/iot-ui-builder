import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faArrowDownUpAcrossLine, faArrowsDownToLine, faArrowsUpToLine, faBold, faItalic, faStrikethrough, faTextHeight, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import type { Frame } from 'src/types/frame';
import type { FrameType } from 'src/enums/frame-type';
import { createPropertyConfig, rangedNumberConfig } from './common';

export const rectangleProperties = [
  {
    properties: [
      createPropertyConfig({
        ...rangedNumberConfig(1),
        propertyName: 'fontSize',
        label: {
          icon: faTextHeight,
          tooltip: 'Text Size'
        }
      }),
      createPropertyConfig({
        ...rangedNumberConfig(0),
        propertyName: 'padding',
        label: {
          icon: faSquare,
          tooltip: 'Text Padding'
        }
      })
    ],
  },
  {
    properties: [
      createPropertyConfig({
        propertyName: 'textAlignment',
        label: 'Text Alignment',
        type: 'segmented-control',
        options: [
          { value: 'left', label: { icon: faAlignLeft, tooltip: 'Left' } },
          { value: 'center', label: { icon: faAlignCenter, tooltip: 'Center' } },
          { value: 'right', label: { icon: faAlignRight, tooltip: 'Right' } },
          { value: 'justify', label: { icon: faAlignJustify, tooltip: 'Justify' } }
        ],
        mapValue: (value: string) => value as Frame<FrameType.Rectangle>['textAlignment']
      }),
      createPropertyConfig({
        propertyName: 'textStyle',
        label: 'Text Style',
        type: 'segmented-control',
        options: [
          { value: 'bold', label: { icon: faBold, tooltip: 'Bold' } },
          { value: 'italic', label: { icon: faItalic, tooltip: 'Italic' } },
          { value: 'underline', label: { icon: faUnderline, tooltip: 'Underline' } },
          { value: 'line-through', label: { icon: faStrikethrough, tooltip: 'Strike Through' } }
        ],
        mapValue: (value: string) => value.split(' ') as Frame<FrameType.Rectangle>['textStyle']
      })
    ],
  },
  {
    properties: [
      createPropertyConfig({
        propertyName: 'textVerticalAlignment',
        label: 'Text Vertical Alignment',
        type: 'segmented-control',
        options: [
          { value: 'top', label: { icon: faArrowsUpToLine, tooltip: 'Top' } },
          { value: 'middle', label: { icon: faArrowDownUpAcrossLine, tooltip: 'Middle' } },
          { value: 'bottom', label: { icon: faArrowsDownToLine, tooltip: 'Bottom' } }
        ],
        mapValue: (value: string) => value as Frame<FrameType.Rectangle>['textVerticalAlignment'],
        className: 'mt-2'
      })
    ],
  },
  {
    properties: [
      createPropertyConfig({
        propertyName: 'backgroundColor',
        label: 'Fill Color',
        type: 'color',
        mapValue: (value: string) => value,
        mapDisplayValue: (value: string) => value.toUpperCase()
      }),
      createPropertyConfig({
        propertyName: 'textColor',
        label: 'Text Color',
        type: 'color',
        mapValue: (value: string) => value,
        mapDisplayValue: (value: string) => value.toUpperCase()
      })
    ],
  },
  {
    properties: [
      createPropertyConfig({
        propertyName: 'textContent',
        label: 'Text Content',
        type: 'textarea',
        className: 'w-full',
        mapValue: (value: string) => value
      })
    ]
  },
];

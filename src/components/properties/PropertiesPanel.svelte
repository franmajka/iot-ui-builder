<script lang="ts">
  import {
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faArrowDownUpAcrossLine,
    faArrowsDownToLine,
    faArrowsUpToLine,
    faBold,
    faExpand,
    faItalic,
    faRotateRight,
    faStrikethrough,
    faTextHeight,
    faUnderline
  } from '@fortawesome/free-solid-svg-icons';
  import { faSquare } from '@fortawesome/free-regular-svg-icons';
  import { framesStore } from 'src/stores/frames';
  import type { PropertyConfig, SupportedTypes } from 'src/types/property-config';
  import type { Frame, FrameByKey, FrameT } from 'src/types/frame';
  import type { KeyOf } from 'src/types/utils';
  import { FrameType } from 'src/enums/frame-type';
  import Property from './Property.svelte';
  import { round } from 'lodash';
  import { sceneStore } from 'src/stores/scene';

  let { selectedFrameId } = sceneStore;

  $: selectedFrame = $selectedFrameId ? $framesStore[$selectedFrameId] : null;

  const rounded = (value: number) => round(value, 2).toString();

  const defaultNumberConfig = {
    className: 'max-w-24 text-right',
    type: 'number',
    mapValue: (value: string) => parseFloat(value) || 0,
    mapDisplayValue: rounded
  } as const;

  const rangedNumberConfig = (min?: number, max?: number) => ({
    ...defaultNumberConfig,
    min,
    max,
    mapValue: (value: string) =>
      Math.min(Math.max(parseFloat(value) || 0, min ?? -Infinity), max ?? Infinity)
  });

  const createPropertyConfig = <
    Key extends KeyOf<_Frame>,
    Type extends SupportedTypes,
    _Frame extends FrameT = FrameByKey<Key>
  >(
    config: Omit<PropertyConfig<Key, Type, _Frame>, 'selectedFrame'>
  ) => config;

  const typeSpecificProperties = {
    [FrameType.Rectangle]: [
      [
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
      [
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
      [
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
      [
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
      [
        createPropertyConfig({
          propertyName: 'textContent',
          label: 'Text Content',
          type: 'textarea',
          className: 'w-full',
          mapValue: (value: string) => value
        })
      ]
    ],
    [FrameType.Image]: [
      [
        createPropertyConfig({
          propertyName: 'src',
          label: 'Image URL',
          type: 'text',
          className: 'w-full',
          mapValue: (value: string) => value
        })
      ]
    ]
  };

  const baseProperties = [
    [
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
    [
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
    [
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
    ]
  ];

  $: properties = [
    ...baseProperties,
    ...(selectedFrame ? typeSpecificProperties[selectedFrame.type] : [])
  ];
</script>

{#if selectedFrame}
  <div class="absolute top-0 bottom-0 right-0 w-96 p-8 shadow-center-2xl bg-white">
    <h4 class="text-lg font-bold text-center mb-4">Properties</h4>

    {#each properties as row}
      {#if Array.isArray(row)}
        <div class="flex justify-between items-center">
          {#each row as property (property.propertyName)}
            <Property {...property} />
          {/each}
        </div>
      {/if}
    {/each}
  </div>
{/if}

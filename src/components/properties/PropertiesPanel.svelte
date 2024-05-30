<script lang="ts">
  import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
  import { faSquare } from '@fortawesome/free-regular-svg-icons';
  import { framesStore } from 'src/stores/frames';
  import type { NumberProperties, PropertyConfig, SupportedTypes } from 'src/types/property-config';
  import type { FrameByKey, FrameT } from 'src/types/frame';
  import type { KeyOf } from 'src/types/utils';
  import { FrameType } from 'src/enums/frame-type';
  import Property from './Property.svelte';
  import { round } from 'lodash';

  export let selectedFrameId: number | null = null;

  $: selectedFrame = selectedFrameId ? $framesStore[selectedFrameId] : null;

  const rounded = (value: number) => round(value, 2).toString();

  const defaultNumberConfig: Pick<
    PropertyConfig<NumberProperties, 'number'>,
    'className' | 'type' | 'mapValue' | 'mapDisplayValue'
  > = {
    className: 'max-w-24 text-right',
    type: 'number',
    mapValue: (value: string) => parseFloat(value) || 0,
    mapDisplayValue: rounded
  };

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
          propertyName: 'backgroundColor',
          label: 'Fill',
          type: 'color',
          mapValue: (value: string) => value,
          mapDisplayValue: (value: string) => value.toUpperCase()
        })
      ],
      [
        createPropertyConfig({
          propertyName: 'textContent',
          label: 'Text',
          type: 'text',
          className: 'w-full',
          mapValue: (value: string) => value,
          mapDisplayValue: (value: string) => value
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
          mapValue: (value: string) => value,
          mapDisplayValue: (value: string) => value
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
        ...defaultNumberConfig,
        propertyName: 'width',
        label: 'W',
        min: 0
      }),
      createPropertyConfig({
        ...defaultNumberConfig,
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
          icon: faSquare,
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
  <div class="absolute top-0 bottom-0 right-0 w-1/6 p-8 shadow-center-2xl bg-white">
    <h4 class="text-lg font-bold text-center mb-4">Properties</h4>

    {#each properties as row}
      {#if Array.isArray(row)}
        <div class="flex justify-between">
          {#each row as property (property.propertyName)}
            <Property {...property} {selectedFrame} />
          {/each}
        </div>
      {/if}
    {/each}
  </div>
{/if}

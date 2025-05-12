import { Portal, Select, createListCollection } from '@chakra-ui/react';

import { useMemo } from 'react';

type Props = {
  title: string;
  placeholder: string;
  items: { label: string; value: string }[];
  value: string;
  onChange: (newValue: string) => void;
};

function StandardSelect({ title, placeholder, items, value, onChange }: Props) {
  const collection = useMemo(() => createListCollection({ items }), [items]);
  return (
    <Select.Root
      collection={collection}
      value={[value]}
      onValueChange={e => onChange(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Label>{title}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {items.map(option => (
              <Select.Item item={option} key={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

export default StandardSelect;

import { Portal, Select, createListCollection } from '@chakra-ui/react';

import { useMemo } from 'react';

type Props = {
  title: string;
  placeholder: string;
  groups: { group: string; items: { label: string; value: string }[] }[];
  value: string;
  onChange: (newValue: string) => void;
};

function OptionGroupSelect({
  title,
  placeholder,
  groups,
  value,
  onChange,
}: Props) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: groups.flatMap(({ group, items }) =>
          items.map(item => ({
            ...item,
            group,
          })),
        ),
      }),
    [groups],
  );
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
            {groups.map(({ group, items }) => (
              <Select.ItemGroup key={group}>
                <Select.ItemGroupLabel color="gray.600">
                  {group}
                </Select.ItemGroupLabel>
                {items.map(item => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

export default OptionGroupSelect;

import { Field, NumberInput } from '@chakra-ui/react';

type Props = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  helperText?: string;
};

function StandardNumberInput({ value, onChange, label, helperText }: Props) {
  const handleChange = (inputValue: string) => {
    onChange(Number(inputValue));
  };
  const inputValue = value.toString() ?? '0';
  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <NumberInput.Root
        w="100%"
        min={0}
        value={inputValue}
        onValueChange={e => handleChange(e.value)}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
}

export default StandardNumberInput;

import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import Select from '@mui/material/Select';
import invariant from 'invariant';
import type { SelectChangeEvent, Theme } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles<T extends string | number>(
  val: T,
  values: readonly T[],
  theme: Theme,
): React.CSSProperties {
  return {
    fontWeight:
      values.indexOf(val) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

type Props<T extends string | number> = {
  label: string;
  labelId: string;
  onChange: (value: readonly T[]) => void;
  options: readonly T[];
  selectedValues: readonly T[];
};

export default function MultiSelect<T extends string | number>({
  label,
  labelId,
  onChange,
  options,
  selectedValues,
}: Props<T>): JSX.Element {
  const theme = useTheme();
  const onValuesChange = React.useCallback(
    (event: SelectChangeEvent<readonly T[]>) => {
      const { value } = event.target;
      invariant(
        typeof value !== 'string',
        'Value cannot be a string. Must be an array.',
      );
      onChange(value);
    },
    [onChange],
  );

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        multiple
        labelId={labelId}
        value={selectedValues}
        onChange={onValuesChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            value={option}
            style={getStyles(option, selectedValues, theme)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

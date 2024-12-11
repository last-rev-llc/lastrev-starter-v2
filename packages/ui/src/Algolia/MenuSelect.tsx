import React from 'react';
import { type UseMenuProps, type UseHitsProps, useMenu } from 'react-instantsearch-core';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { unCamelCase } from '../utils/unCamelCase';
import { Icon } from '../Icons/Icon';

type MenuSelectProps = {
  ownerState?: any;
  attribute: string;
  others?: UseMenuProps;
};

const MenuSelect = ({ attribute, others }: MenuSelectProps) => {
  const { items, refine } = useMenu({ attribute, ...others });

  const ChevronDownIcon = React.useMemo(
    () => (props: { color: string }) => <Icon iconName="chevronDown" {...props} />,
    []
  );

  const { value: selectedValue } = items.find((item) => item.isRefined) || {
    value: 'all' // Set the default value to 'all'
  };

  return (
    <FormControl variant="standard">
      <Select
        IconComponent={ChevronDownIcon}
        id={`menu-select-${attribute}`}
        value={selectedValue}
        defaultValue="all" // Set the default value to 'all'
        onChange={(event) => {
          refine(event.target.value === 'all' ? '' : event.target.value); // Refine to an empty string for 'all' value
        }}>
        <MenuItem value="all" style={{display:'none'}}>{unCamelCase(attribute)}</MenuItem>
        {items.map((item) => (
          <MenuItem key={`menu-select-option-${attribute}-${item.value}`} value={item.value}>
            {item.label} ({item.count})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MenuSelect;

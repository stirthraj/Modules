     <MultipleSelect
                  selected={state.apr}
                  handleChange={handleChange6}
                  options={options6}
                  keys={"ques"}
                  label="Appraisal"
                />
                
                
                
                import React from 'react';
import {
  Select,
  FormControl,
  MenuItem,
  ListItemText,
  InputLabel,
  Checkbox,
  ListItemIcon,
  OutlinedInput,
} from '@mui/material';
import './style';

import { useStyles } from './utils'; //MenuProps

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

export default function MultipleSelect({
  selected,
  handleChange,
  options,
  keys,
  label,
}) {
  const classes = useStyles();
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-multiple-name-label'>{label}</InputLabel>
      <Select
        labelId='demo-multiple-name-label'
        id='demo-multiple-name'
        label={label}
        size='small'
        style={{ overflowX: 'auto' }}
        multiple
        input={<OutlinedInput label={label} />}
        value={selected}
        onChange={handleChange}
        renderValue={(selected) =>
          selected.map((res, index) => (
            <div key={res._id} className='q-list'>
              <span>{index + 1}.&nbsp;</span>
              <span className='q-content'>{res[keys]}</span>
            </div>
          ))
        }
        MenuProps={MenuProps}
      >
        <MenuItem
          value='all'
          classes={{
            root: isAllSelected ? classes.selectedAll : '',
          }}
        >
          <ListItemIcon>
            <Checkbox
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected.length > 0 && selected.length < options.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary='Select All'
          />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option._id} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText
              primary={
                keys === 'FirstName'
                  ? option[keys] + ' ' + option['LastName']
                  : option[keys]
              }
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}











import { FormControl, InputLabel, Select } from '@mui/material';

export default function SelectMenu({
  label,
  open,
  handleClose,
  handleOpen,
  year,
  handleChange,
  items,
}) {
  return (
    <FormControl>
      <InputLabel id='select-label'>{label}</InputLabel>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={year}
        onChange={handleChange}
        // input={<BootstrapInput />}
        labelId='select-label'
        label={label}
      >
        {items}
      </Select>
    </FormControl>
  );
}

import React, {useState} from 'react';
import { Box, makeStyles, createStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },

    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
  }),
);

const Filter = (props) =>  {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Level</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="difficulty"
          name="difficulty"
          label="Level"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={props.value}
          onChange={props.onChange}
        >
           <MenuItem value="">None</MenuItem>
          {props.list.map((item, index) => 
             <MenuItem key={`filter ${index}`} value={item}>{item}</MenuItem>
          )}  
        </Select>
      </FormControl>
    </Box>
  );
}

export default Filter
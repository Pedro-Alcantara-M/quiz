import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Modal, Fade, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
    overflowY: 'scroll',
    maxHeight: '70vh',


  },

  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    margin: 0,
    padding: 0,
    border: '2px solid #000',
    borderRadius: '50%',
  },
}));

export default function ReportModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.close}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
           {props.children}
           <IconButton
              className={classes.close}
              aria-label="close"
              onClick={props.close}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
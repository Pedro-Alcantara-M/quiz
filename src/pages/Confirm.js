/* eslint-disable no-unused-vars */
import React from 'react'
import { useStateValue } from '../context/state';
import { useHistory } from 'react-router';
import {
    Box,
    Button,
    Typography,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(2),
    },

    buttons: {
        display: 'flex',
        marginTop: theme.spacing(2),
        gap: theme.spacing(1),
    },

}));

const Confirm = () => {
    const classes = useStyles();
    const history = useHistory()
    const [state, dispatch] = useStateValue();
    const { qtd, level } = state

    const handleStart = () => {
        history.push("/questions")
    }

    const handleBack = () => {
        history.push("/")
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h1" component="h2">QUIZ</Typography>
            <Typography variant="h4" component="h4">Number of questions: {qtd}</Typography>
            {level &&
                <Typography variant="h4" component="h4">Difficulty: {level}</Typography>
            }
            <Box className={classes.buttons}>
                <Button variant="contained" color="primary" onClick={handleStart}>
                    Start
                </Button>
                <Button variant="contained" color="secondary" onClick={handleBack}>
                    Back
                </Button>

            </Box>
        </Box>
    )
}

export default Confirm
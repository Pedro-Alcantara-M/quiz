import React, { useEffect, useMemo, useState } from 'react'
import { useStateValue } from '../context/state';
import { useHistory } from 'react-router';
import Accordions from '../components/Accordions'
import {
    Box,
    Button,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    buttons: {
        display: 'flex',
        marginTop: theme.spacing(2),
        gap: theme.spacing(1),
    },

}));

const Result = () => {
    const classes = useStyles();
    const history = useHistory()
    const [state, dispatch] = useStateValue();
    const [value, setValue] = useState("")
    const { questions, answers } = state

    const handleClick = () => {
        history.push("/")
    }

    return (
        <Box className={classes.root}>
            <Accordions 
            questions={questions}
            answers={answers}
            value={value} 
            />

            <Box className={classes.buttons}>
                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Finalizar
                </Button>
            </Box>
        </Box>
    )
}

export default Result
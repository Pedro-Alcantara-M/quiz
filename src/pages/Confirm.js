import React, { useMemo } from 'react'
import { useStateValue } from '../context/state';
import api from "../services/api"
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
    const {qtd} = state

    const handleStart = () => {
        api.get(`api.php?amount=${qtd}`)
            .then(res => {
                localStorage.setItem('Questions', JSON.stringify(res.data.results))
            })
        history.push("/questions")
    }

    const handleBack = () => {
        localStorage.removeItem('Qtd')
        history.push("/")
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h1" component="h2">QUIZ</Typography>
            <Typography variant="h4" component="h4">Quantidade de perguntas: {qtd}</Typography>
            <Box className={classes.buttons}>
                <Button variant="contained" color="primary" onClick={handleStart}>
                    Começar
                </Button>
                <Button variant="contained" color="secondary" onClick={handleBack}>
                    Voltar
                </Button>

            </Box>
        </Box>
    )
}

export default Confirm
import React, { useState } from 'react'
import { useStateValue } from '../context/state';
import { useHistory } from 'react-router';
import { 
    Box, 
    Button,
    Typography, 
    TextField, 
    makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(5),
        gap: theme.spacing(2),
    },
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory()
    const [state, dispatch] = useStateValue();
    const [value, setValue] = useState("")

    const handleSubmit = () => {
        dispatch({type: 'Qtd', payload: value})
        history.push("/confirm")
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h1" component="h2">QUIZ</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    id="outlined-number"
                    placeholder="Nº de perguntas"
                    value={value}
                    required
                    label="Quantidade"
                    type="number"
                    onChange={(ev) => setValue(ev.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />

                <Button variant="contained" color="primary" type="submit">
                    Avançar
                </Button>
                
            </form>
        </Box>
    )
}

export default Home
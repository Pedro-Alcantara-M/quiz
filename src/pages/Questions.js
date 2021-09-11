import React, { useEffect, useMemo, useState } from 'react'
import { useStateValue } from '../context/state';
import { useHistory } from 'react-router';
import { getState } from '../helper/get-state';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
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

const Questions = () => {
    const classes = useStyles();
    const history = useHistory()
    const [state, dispatch] = useStateValue();
    const [data, setData] = useState()
    const [currentIndex, setCurrentIndex] = useState(0)
    const { questions, answers } = state

    useEffect(() => {
        getState(dispatch, currentIndex)
        console.log({data})
    }, [currentIndex])

    const handleChange = (event) => {
        setData({...data, data: event.target.value});
    };

    const handleAnswer = () => {
      let newIndex = currentIndex + 1
      
        if(newIndex >= questions.length){
            history.push("/results")
        } else {
            setCurrentIndex(newIndex)
        }
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h1" component="h2">QUIZ</Typography>
            {questions?.length > 0
                ?
                <>
                    <>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{`${currentIndex + 1} - ${questions[currentIndex].question}`}</FormLabel>
                            <RadioGroup aria-label="answers" name="answers" value={data} onChange={handleChange}>
                                {answers?.map((answer) => {
                                    return <FormControlLabel value={answer} required control={<Radio />} label={answer} />
                                })}
                                </RadioGroup>
                        </FormControl>
                        <Box className={classes.buttons}>
                            <Button variant="contained" color="primary" onClick={handleAnswer}>
                                Confirmar
                            </Button>
                        </Box>
                    </>
                </>
                :
                <Typography variant="h1" component="h2">Loading...</Typography>
            }
        </Box>
    )
}

export default Questions
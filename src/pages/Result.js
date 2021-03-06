import React, { useState, useEffect } from 'react'
import { useStateValue } from '../context/state';
import { useHistory } from 'react-router';
import Accordions from '../components/Accordions'
import {
    Box,
    Button,
    makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 50,
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
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useStateValue();
    const [answers, setAnswers] = useState()
    const [reports, setReports] = useState([])
    const { userAnswers, score, questions } = state
    const answerList = questions.map((item)=> item.answers)
    let userReport = {
        score: score,
        questions: questions,
        userAnswers: userAnswers,
    }

    const handleClick = () => {
        let resultReports = [...reports, userReport]

        localStorage.setItem('reports', JSON.stringify(resultReports))
        history.push("/")
    }

    useEffect(() => {

        let listReportArr = JSON.parse(localStorage.getItem('reports'))

        if (listReportArr) {
            setReports(listReportArr)
        } else {
            return;
        }
        
        setAnswers(answerList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box className={classes.root}>
            <Box>
                <Typography variant="h1" component="h2">Score: {score}/{questions?.length}</Typography>
            </Box>

            <Accordions
                questions={questions}
                answers={answers}
                userAnswers={userAnswers}
            />

            <Box className={classes.buttons}>
                <Button variant="contained" color="secondary" onClick={handleClick}>
                Done
                </Button>
            </Box>
        </Box>
    )
}

export default Result
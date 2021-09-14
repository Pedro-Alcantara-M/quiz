import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
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
    const { id } = useParams()
    const [answers, setAnswers] = useState()
    const [currentQuestion, setCurrentQuestion] = useState()
    const [userAnswers, setUserAnswers] = useState()
    const [score, setScore] = useState()
    const [data, setData] = useState([])
    const index = parseInt(id)


    const handleClick = () => {
        history.push("/")
    }

    useEffect(() => {
        let listReportArr = JSON.parse(localStorage.getItem('reports'))
        setData(listReportArr)
    }, [id, setData])


    useEffect(() => {
        let questionArr = data[index]?.questions
        let userAnswerArr = data[index]?.userAnswers
        let answerList = currentQuestion?.map((item) => item.answers)
        let scoreValue = data[index]?.score

        setUserAnswers(userAnswerArr)
        setCurrentQuestion(questionArr)
        setAnswers(answerList)
        setScore(scoreValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, data])

    return (
        <Box className={classes.root}>
            <Box>
                <Typography variant="h1" component="h2">Score: {score}/{currentQuestion?.length}</Typography>
            </Box>

            <Accordions
                questions={currentQuestion}
                answers={answers}
                userAnswers={userAnswers}
            />

            <Box className={classes.buttons}>
                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Back
                </Button>
            </Box>
        </Box>
    )
}

export default Result
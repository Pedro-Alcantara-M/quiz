import React, { useEffect, useMemo, useState } from 'react'
import { useStateValue } from '../context/state';
import { useHistory } from 'react-router';
import api from '../services/api';
import {
    Box,
    Button,
    FormControl,
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
        justifyContent: 'center',
    },

    buttons: {
        display: 'flex',
        marginTop: theme.spacing(2),
        gap: theme.spacing(1),
    },

    questions: {
        minWidth: "35vw",
        margin: theme.spacing(4),
        fontSize: "22px",
    },

}));

const Questions = () => {
    const classes = useStyles();
    const history = useHistory()
    const [state, dispatch] = useStateValue();
    const [answers, setAnswers] = useState([])
    const [error, setError] = useState(false)
    const [userScore, setUserScore] = useState(0)
    const [questions, setQuestions] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)
    const { qtd, level } = state

    useEffect(() => {
        api.get(`api.php?amount=${qtd}&difficulty=${level}`)
            .then(res => {

                const questions = res.data.results.map((question) =>
                ({
                    ...question,
                    answers: [
                        question.correct_answer,
                        ...question.incorrect_answers
                    ].sort(() => Math.random() - 0.6),
                }))
                setQuestions(questions)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (event) => {
        setAnswers([...answers, { answer: event.target.value }]);
    }

    const handleAnswer = () => {
        let newIndex = currentIndex + 1
        let score = userScore

        if (answers[currentIndex]?.answer === undefined) {
            setError(true)
            setCurrentIndex(currentIndex)
            return
        }

        if (answers[currentIndex]?.answer === questions[currentIndex]?.correct_answer) {
            score = score+1
            setUserScore(score)
        } 

        if (newIndex >= questions.length) {
            dispatch({ type: 'Questions', payload: questions })
            dispatch({ type: 'UserAnswers', payload: answers })
            dispatch({ type: 'Score', payload: score })
            history.push("/results")
        } else {
            setCurrentIndex(newIndex)
            setError(false)
        }
    }

    return (
        <Box className={classes.root}>
            {questions?.length > 0
                ?
                <>
                    <Typography variant="h1" component="h2">QUIZ</Typography>
                    <FormControl className={classes.questions} component="fieldset">
                        <Box dangerouslySetInnerHTML={{ __html: `${currentIndex + 1} - ${questions[currentIndex].question}` }} ></Box>
                        <RadioGroup aria-label="answers" name="answers" value={answers.answer} onChange={handleChange}>
                            {questions[currentIndex].answers?.map((answer, index) => {
                                return <FormControlLabel key={`${answer} ${index}`} value={answer} required control={<Radio />} label={answer} />
                            })}
                            {error && (
                                <Typography variant="p" component="p" color="secondary">Choose one asnwer.</Typography>
                            )}
                        </RadioGroup>
                    </FormControl>
                    <Box className={classes.buttons}>
                        <Button variant="contained" size="large" color="primary" onClick={handleAnswer}>
                            Next
                        </Button>
                    </Box>
                </>
                :
                <Typography variant="h3" component="h3">Loading...</Typography>
            }
        </Box>
    )
}

export default Questions
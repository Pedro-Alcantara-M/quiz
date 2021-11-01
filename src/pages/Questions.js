import React, { useEffect, useState } from 'react'
import api from '../services/api';
import { useStateValue } from '../context/state';
import { useHistory } from 'react-router';
import { repairText } from '../helper/repair-text'
import { useFormik } from 'formik';
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
    const [questions, setQuestions] = useState({
        question: '',
        answers: [],
        answer: ''
    })
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



    const formik = useFormik({
        initialValues: {
            answer: '',
        },
        onSubmit: (values) => {
            let newIndex = currentIndex + 1
            let score = userScore

            if (values.answer === '') {
                setError(true)
                setCurrentIndex(currentIndex)
                return
            }

            if (values.answer === questions[currentIndex]?.correct_answer) {
                score = score + 1
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
        },

    });

    const handleChange = (event) => {
        formik.setFieldValue('answer', event.target.value)
        setAnswers([...answers, { answer: event.target.value }]);
    }

    return (
        <Box className={classes.root}>
            {questions?.length > 0
                ?
                <>
                    <Typography variant="h1" component="h2">QUIZ</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl className={classes.questions} component="fieldset">
                            <Typography variant="h5" component="h5">
                                {currentIndex + 1} - {repairText(questions[currentIndex].question)}
                            </Typography>
                            <RadioGroup
                                aria-label="answer"
                                name="answer"
                                value={formik.values.answers}
                                onChange={handleChange}
                            >
                                {questions[currentIndex].answers?.map((answer, index) => {
                                    return (
                                        <FormControlLabel
                                            key={`${answer} ${index}`}
                                            value={answer}
                                            control={<Radio required/>}
                                            label={repairText(answer)}
                                        />
                                    )
                                })}
                                {error && (
                                    <Typography variant="h6" component="h6" color="secondary">Choose one asnwer.</Typography>
                                )}
                            </RadioGroup>
                        </FormControl>
                        <Box className={classes.buttons}>
                            <Button variant="contained" type='submit' size="large" color="primary">
                                Next
                            </Button>
                        </Box>
                    </form>
                </>
                :
                <Typography variant="h3" component="h3">Loading...</Typography>
            }
        </Box>
    )
}

export default Questions
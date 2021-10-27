import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBox from '@material-ui/icons/AccountBox';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { repairText } from '../helper/repair-text';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },

    answers: {
        display: 'flex',
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightRegular,
        marginLeft: theme.spacing(2),
        gap: theme.spacing(1),
    },

    correctAnswer: {
        fontSize: theme.typography.pxToRem(16),
        marginRight: theme.spacing(1),
        color: "#4BB543",
    },

    iconAnswer: {
        fontSize: theme.typography.pxToRem(16),
        marginRight: theme.spacing(1),
        transform: 'translatey(3px)',
        color: "#4BB543",
    },

    iconIncorrectAnswer: {
        fontSize: theme.typography.pxToRem(16),
        marginRight: theme.spacing(1),
        transform: 'translatey(3px)',
        color: "#F51010",
    },

    incorrectAnswer: {
        fontSize: theme.typography.pxToRem(16),
        marginRight: theme.spacing(1),
        color: "#F51010",
    },

}));

export default function SimpleAccordion({ questions, userAnswers }) {
    const classes = useStyles();

    const questionIcon = (index) => {
        if (userAnswers[index]?.answer === questions[index].correct_answer) {
            return true
        } else {
            return false
        }
    }

    const answerIcon = (index, answer) => {
        if (questions[index].correct_answer && answer === userAnswers[index]?.answer) {
            return "rightAnswer"

        } else if (userAnswers[index]?.answer === answer) {
            return "userAnswer"

        } else if (questions[index].correct_answer === answer) {
            return "correctAnswer"
        } else {
            return "incorrectAnswer"
        }
    }

    return (
        <div className={classes.root}>
            {questions?.map((item, index) =>
                <Accordion key={`Questions ${index}`}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            {questionIcon(index) ? <CheckIcon className={classes.correctAnswer} /> : <CloseIcon className={classes.incorrectAnswer} />}
                            {`${index + 1} - ${repairText(item.question)}`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl component="fieldset">
                            {questions[index].answers?.map((answer) =>
                                <Typography key={`random ${answer}`} className={classes.answers}>
                                    {answerIcon(index, answer) === "rightAnswer" && (
                                        <AccountBox className={classes.iconAnswer} />
                                    )}
                                    {answerIcon(index, answer) === "userAnswer" && (
                                        <AccountBox className={classes.iconAnswer} />
                                    )}
                                    {answerIcon(index, answer) === "correctAnswer" && (
                                        <CheckIcon className={classes.iconAnswer} />
                                    )}
                                    {answerIcon(index, answer) === "incorrectAnswer" && (
                                        <CloseIcon className={classes.iconIncorrectAnswer} />
                                    )}
                                    {repairText(answer)}
                                </Typography>
                            )}
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
}

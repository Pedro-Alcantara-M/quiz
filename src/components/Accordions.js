import React, {useState} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function SimpleAccordion({ questions, handleChange }) {
    const classes = useStyles();
    const [value, setValue] = useState("")

    return (
        <div className={classes.root}>
            {questions?.map((item, index) =>
                <Accordion key={item.question}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}> {`${index + 1} - ${item.question}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl component="fieldset">
                                <RadioGroup aria-label="answers" name="answers" value={value} onChange={handleChange}>
                                {item.incorrect_answers.map((answer) => {
                                return <FormControlLabel value={answer} control={<Radio />} label={answer} />
                            })}
                                </RadioGroup>
                            </FormControl>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
}

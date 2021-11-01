/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/state';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Filter from '../components/Filter';
import Modal from '../components/Modal'
import VisibilityIcon from '@material-ui/icons/Visibility';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Box,
    Button,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    Typography,
    Input,
    TextField,
    makeStyles,
    withStyles
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#F5F5F5',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 16,
        borderBottom: 'none'
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(5),
        gap: theme.spacing(2),
    },

    nextbutton: {
        height: "54px",
    },

    reports: {
        marginTop: theme.spacing(4),
    },

    icon: {
        marginRight: theme.spacing(1),
    },
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory()
    const [state, dispatch] = useStateValue();
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [reports, setReports] = useState({})

    const difficulty = ["", "easy", "medium", "hard"]

    useEffect(() => {
        setReports(JSON.parse(localStorage.getItem('reports')))
    }, [])

    const formik = useFormik({
        initialValues: {
            numberQuestions: '',
            difficulty: '',
        },
        validationSchema: Yup.object().shape({
            numberQuestions: Yup.number()
                .min(1, 'choose a value greater than zero')
                .required('This field is required'),
        }),
        onSubmit: (values) => {
            dispatch({ type: 'Qtd', payload: values.numberQuestions })
            dispatch({ type: 'Difficulty', payload: values.difficulty })
            history.push("/confirm")
        },
    });

    const handleClick = () => {
        setOpen(true)
    }

    const viewReport = (index) => {
        history.push(`/reports/${index}`)
    }

    const deleteReport = (currentIndex) => {
        let filterReports = reports.filter((item, index) => index !== currentIndex)

        setReports(filterReports)
        localStorage.setItem('reports', JSON.stringify(filterReports))
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h1" component="h2">QUIZ</Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField
                    id="numberQuestions"
                    name="numberQuestions"
                    placeholder="Number of questions"
                    variant="outlined"
                    label="Quantity"
                    type="number"
                    value={formik.values.numberQuestions < 0 
                        ? 0 : formik.values.numberQuestions}
                    onChange={formik.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={formik.touched.numberQuestions && Boolean(formik.errors.numberQuestions)}
                    helperText={formik.touched.numberQuestions && formik.errors.numberQuestions}
                />

                <Filter
                    list={difficulty}
                    value={formik.values.difficulty}
                    onChange={formik.handleChange}
                />

                <Button className={classes.nextbutton} variant="contained" color="primary" type="submit">
                    Next
                </Button>
            </form>

            <Box>
                {open && (
                    <Modal
                        open={open}
                        close={() => setOpen(false)}
                    >
                        <TableContainer>
                            <Table className={classes.table} size="small" aria-label="Tabela de clientes">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>ID</StyledTableCell>
                                        <StyledTableCell>Score</StyledTableCell>
                                        <StyledTableCell>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reports && reports.map((item, index) => (
                                        <TableRow key={`Reports ${index}`}>
                                            <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                            <StyledTableCell>{`${item.score}/${item.questions?.length}`}</StyledTableCell>
                                            <StyledTableCell>
                                                <IconButton onClick={() => viewReport(index)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton onClick={() => deleteReport(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {!reports && (
                                <Typography variant="h5" component="h5">No reports found</Typography>
                            )}
                        </TableContainer>
                    </Modal>
                )}
            </Box>
            <Button
                variant="contained"
                className={classes.reports}
                color="primary"
                onClick={handleClick}
            > <AssessmentIcon className={classes.icon} /> Reports</Button>
        </Box >
    )
}

export default Home
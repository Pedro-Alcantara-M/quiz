import React from 'react'
import { Switch, Route } from "react-router-dom";
import { Grid, makeStyles } from '@material-ui/core'
import Home from '../pages/Home';
import Confirm from '../pages/Confirm';
import Questions from '../pages/Questions';
import Rasult from '../pages/Result'
import ViewReport from '../pages/ViewReport'

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
}));

const Content = () => {
    const classes = useStyles()

    return (
        <Grid item xs={12} md={12} lg={12} className={classes.root}>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/confirm">
                    <Confirm />
                </Route>
                <Route exact path="/questions">
                    <Questions />
                </Route>
                <Route exact path="/results">
                    <Rasult />
                </Route>
                <Route exact path="/reports/:id">
                    <ViewReport />
                </Route>
            </Switch>
        </Grid>
    )
}

export default Content
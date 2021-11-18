import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {makeStyles, theme} from "../theme";
import {Box, Grid, ThemeProvider} from "@mui/material";
import {Theme} from "@mui/system";
import {Header} from "../components/Header";
import React from "react";

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    }
}));

function MyApp({Component, pageProps}: AppProps) {
    const {classes} = useStyles();
    return <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <div className={classes.wrapper} id='wrapper'>
                <div className={classes.contentContainer} id='content-container'>
                    <div className={classes.content} id='content'>
                        <Grid container
                              direction="row"
                              justifyContent="center"
                              alignItems="center" spacing={2}>
                            <Grid item lg={8} ml={2}>
                                <Box mt={2}>
                                    <Header/>
                                    <Component {...pageProps} />
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    </ThemeProvider>
}

export default MyApp

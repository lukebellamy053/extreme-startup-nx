import {GetServerSideProps} from "next";
import {getPlayers, getRound, getScores} from "../../server/Player";
import {useRouter} from "next/router";
import axios from "axios";
import React, {useEffect, useMemo} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import CurrentScoreBarChart from "../../components/CurrentScoreBarChart";
import {ScoreHistory} from "../../components/ScoreHistory";


export const ViewPlayerScreen = ({players, round}) => {
    const router = useRouter();

    const stopServer = () => {
        axios.delete('/api/server').then(() => reloadPage())
    }

    const reloadPage = useMemo(() => () => router.replace(router.asPath), [router]);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace(router.asPath);
        }, 2000);
        return () => clearTimeout(timer);
    }, [reloadPage])

    return <>
        <Typography variant="h4">Running Server</Typography>
        <Typography variant="body1" color="text.secondary">The game has begun</Typography>
        <Box mt={2}>
            <Button onClick={() => stopServer()}>Stop</Button>
        </Box>
        <Box mt={2}>
            <Typography variant="h6">Players - {players.length}</Typography>
        </Box>
        <Box mt={2}>
            <Typography variant="h6">Round - {round}</Typography>
        </Box>
        <Box mt={2}>
            <Typography variant="h6">Top Scorers</Typography>
        </Box>
        <Grid container>
            <Grid item sm={12} lg={4}>
                <Box mt={2} height={400}>
                    {round > 0 && <CurrentScoreBarChart players={players}/>}
                </Box>
            </Grid>
        </Grid>
    </>
}

// @ts-ignore - used by nextjs
export const getServerSideProps: GetServerSideProps = async (context) => {
    const round = await getRound();
    if (round == null) {
        return {
            redirect: {
                destination: '/server'
            }
        }
    }
    const [players, scores] = await Promise.all([getPlayers(), getScores()])
    return {
        props: {
            players,
            round,
            scores
        },
    }
}
export default ViewPlayerScreen;
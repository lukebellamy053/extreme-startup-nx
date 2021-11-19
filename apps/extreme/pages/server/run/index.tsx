import React from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import CurrentScoreBarChart from '../../../components/CurrentScoreBarChart';
import { ScoreHistory } from '../../../components/ScoreHistory';
import { getPlayers, getRound, getScores } from '../../api/redis';
import { PlayersTable } from '../../../components/PlayersTable';
import { useAutoRefresh } from '../../../hooks/useAutoRefresh';

export const RunServerPage = ({ players, round, scores }) => {

  const { reloadPage } = useAutoRefresh();

  const stopServer = () => {
    axios.delete('/api/server').then(() => reloadPage());
  };

  return <>
    <Typography variant='h4'>Running Server</Typography>
    <Typography variant='body1' color='text.secondary'>The game has begun</Typography>
    <Box mt={2}>
      <Button onClick={() => stopServer()}>Stop</Button>
    </Box>
    <Box mt={2}>

      <Grid container direction='row' justifyContent='center'
            alignItems='center'>
        <Grid item sm={12} lg={10}>
          <Typography variant='h6'>Players - {players.length}</Typography>
          <Divider />
          <PlayersTable users={players} />
        </Grid>
      </Grid>
    </Box>
    <Box mt={2}>
      <Typography variant='h6'>Round - {round}</Typography>
    </Box>
    <Box mt={2}>
      <Typography variant='h6'>Top Scorers</Typography>
    </Box>
    <Grid container>
      <Grid item sm={12} lg={4}>
        <Box mt={2} height={400}>
          {round > 0 && <CurrentScoreBarChart players={players} />}
        </Box>
      </Grid>
      <Grid item sm={12} lg={8}>
        <Box mt={2} height={400}>
          {round > 0 && <ScoreHistory scores={scores} />}
        </Box>
      </Grid>
    </Grid>
  </>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const round = await getRound();
  if (round == null) {
    return {
      props: {},
      redirect: {
        destination: '/server'
      }
    };
  }
  const [players, scores] = await Promise.all([getPlayers(), getScores()]);
  return {
    props: {
      players,
      round,
      scores
    }
  };
};

export default RunServerPage;

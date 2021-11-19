import { GetServerSideProps } from 'next';
import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { getPlayers, getRound, getScores } from '../api/redis';
import { UserTable } from '../../components/UserTable';
import { useAutoRefresh } from '../../hooks/useAutoRefresh';


export const ViewPlayerScreen = ({ user, round }) => {

  useAutoRefresh();

  return <>
    <Typography variant='h4'>{user.name}</Typography>
    <Typography variant='body1' color='text.secondary'>score: {user.score}</Typography>
    <Box mt={2}>
      <Grid container direction='row' justifyContent='center'
            alignItems='center'>
        <Grid item sm={12} lg={10}>
          <Divider />
          <UserTable user={user} />
        </Grid>
      </Grid>
    </Box>
  </>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
      user: players.find(x => x.name === params.id),
      round,
      scores
    }
  };
};
export default ViewPlayerScreen;

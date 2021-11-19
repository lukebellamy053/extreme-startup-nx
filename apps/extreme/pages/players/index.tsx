import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import { getPlayers } from '../api/redis';
import { useAutoRefresh } from '../../hooks/useAutoRefresh';

export const ServerPage = ({ players }) => {

  const { reloadPage } = useAutoRefresh();

  return <>
    <Typography variant='h4'>Players</Typography>
    <Box mt={2}>
      <Divider />
    </Box>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label='secondary mailbox folders'>
        <List>
          {
            players.map(player => (
              <ListItem disablePadding key={player.name}>
                <ListItemText primaryTypographyProps={{ color: 'text.secondary' }}
                              primary={`${player.name} - ${player.host}`} />
              </ListItem>
            ))
          }
        </List>
      </nav>
    </Box>
  </>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      players: await getPlayers()
    }
  };
};

export default ServerPage;

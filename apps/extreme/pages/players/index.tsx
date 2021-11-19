import React, { useEffect } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import { getPlayers } from '../api/redis';

export const ServerPage = ({ players }) => {

  const router = useRouter();

  const removePlayer = (name: string) => {
    axios.delete(`/api/players/${name}`).then(reloadPlayers);
  };

  const reloadPlayers = () => {
    router.reload();
  };

  useEffect(() => {
    reloadPlayers();
  }, []);

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
                <Button onClick={() => removePlayer(player.name)}>
                  <DeleteIcon color='error' />
                </Button>
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

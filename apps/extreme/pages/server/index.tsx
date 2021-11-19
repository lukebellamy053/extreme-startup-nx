import React, {useEffect, useMemo} from "react";
import {Box, Button, Divider, Typography} from "@mui/material";
import {GetServerSideProps} from "next";
import {NewServerForm} from "../../components/NewServerForm";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from "@mui/material/ListItemText";
import {useRouter} from "next/router";
import { getPlayers, getRound } from '../api/redis';

export const ServerPage = ({players}) => {

    const router = useRouter();

    const onSubmit = useMemo(() => (data) => {
        axios.post("/api/players", data).then(reloadPlayers)
    }, []);

    const removePlayer = useMemo(() => (name: string) => {
        axios.delete(`/api/players/${name}`).then(reloadPlayers)
    }, []);

    const reloadPlayers = useMemo(() => {
        return () => router.replace(router.asPath);
    }, [router]);

    useEffect(() => {
        const interval = setInterval(() => {
            reloadPlayers();
        }, 4000);
        return () => {
            clearInterval(interval);
        }
    }, [reloadPlayers])

    return <>
        <Typography variant="h4">Create a new server</Typography>
        <Typography variant="body1" color="text.secondary">Fill out the information below to create a new
            server</Typography>
        <Box mt={2}>
            <NewServerForm onSubmit={onSubmit}/>
        </Box>
        <Box mt={2}>
            <Divider/>
        </Box>
        <Box mt={2}>
            <Typography variant="h6">Players</Typography>
        </Box>
        <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
            <nav aria-label="secondary mailbox folders">
                <List>
                    {
                        players.map(player => (
                            <ListItem disablePadding key={player.name}>
                                <ListItemText primaryTypographyProps={{color: "text.secondary"}}
                                              primary={`${player.name} - ${player.host}`}/>
                                <Button onClick={() => removePlayer(player.name)}>
                                    <DeleteIcon color="error"/>
                                </Button>
                            </ListItem>
                        ))
                    }
                </List>
            </nav>
        </Box>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const round = await getRound();
  if (round != null) {
    return {
      props: {},
      redirect: {
        destination: '/server/run'
      }
    };
  }
    return {
        props: {
            players: await getPlayers()
        },
    }
}

export default ServerPage;

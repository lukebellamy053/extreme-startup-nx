import type {NextPage} from 'next'
import {Button, Typography} from "@mui/material";
import Link from 'next/link'
import Image from 'next/image'
import React from 'react';
import {Box} from "@mui/system";
import {Header} from "../components/Header";

const Home: NextPage = () => {
    return (
        <>
            <Box>
                <Typography variant="h6">
                    Welcome to Extreme Startup
                </Typography>
                <Typography variant="body1">
                    Use the links below to view the configured questions or to start the game
                </Typography>
            </Box>
            <Box>
                <Link href="/questions">
                    <Button color="primary">Questions</Button>
                </Link>
                <Link href="/server">
                    <Button color="secondary">Server</Button>
                </Link>
            </Box>
        </>
    )
}

export default Home

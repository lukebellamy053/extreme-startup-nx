import {Button, Grid, TextField} from "@mui/material";
import React, {useState} from "react";

export const NewServerForm = ({onSubmit}) => {
    const [host, setHost] = useState('');
    const [name, setName] = useState('');

    return <Grid container alignItems="center" spacing={2}>
        <Grid item sm={12} md={3}>
            <TextField value={host} onChange={e => setHost(e.target.value)} fullWidth label="Player Server"/>
        </Grid>
        <Grid item sm={12} md={3}>
            <TextField value={name} onChange={e => setName(e.target.value)} fullWidth label="Player Name"/>
        </Grid>
        <Grid item sm={12} md={3}>
            <Button onClick={() => onSubmit({host, name})}>Add Player</Button>
        </Grid>
    </Grid>
}

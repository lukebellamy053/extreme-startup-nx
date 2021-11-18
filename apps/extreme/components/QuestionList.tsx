import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Questions} from "../consts/questions";
import Link from 'next/link'

export default function QuestionList() {
    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <nav aria-label="secondary mailbox folders">
                <List>
                    {
                        Questions.map(question => (
                            <ListItem disablePadding key={question.id}>
                                <Link href={`/questions/${question.id}`}>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{color:"text.secondary"}} primary={`${question.id} - ${question.title}`}/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))
                    }
                </List>
            </nav>
        </Box>
    );
}

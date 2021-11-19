import React from 'react';
import { Box, Typography } from '@mui/material';
import QuestionList from '../../components/QuestionList';

export const QuestionListPage = () => {
  return <>
    <Typography variant='h4'>Question List</Typography>
    <Typography variant='body1' color='text.secondary'>A list of all of the possible questions</Typography>
    <Box mt={2}>
      <QuestionList />
    </Box>
  </>;
};

export default QuestionListPage;

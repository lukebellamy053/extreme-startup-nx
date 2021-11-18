import React, {FC} from "react";
import {Box, Breadcrumbs, Grid, Typography} from "@mui/material";
import {GetStaticPaths, GetStaticProps} from "next";
import {Questions} from "../../consts/questions";
import Link from 'next/link'

interface Props {
    id: number;
}

export const QuestionPage: FC<Props> = ({id}) => {
    const question = Questions.find(x => x.id == id)!;
    const example = question.transformer();
    return <>
        <Box mb={2}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/questions">
                    <Typography >Questions</Typography>
                </Link>
                <Typography color="text.secondary">{question.id}</Typography>
            </Breadcrumbs>
        </Box>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Typography variant="h4" >Question {question.id} - {question.title}</Typography>
                <Box mt={2}>
                    <Typography
                        variant="body1" color="text.secondary">Example: {example.question}</Typography>
                </Box>
                <Box mt={2}>
                    <Typography
                        variant="body1" color="text.secondary">Expected Answer: {example.answer}</Typography>
                </Box>
            </Grid>
        </Grid>
    </>
}

export const getStaticPaths: GetStaticPaths = context => {
    return {
        paths: Questions.map((q, index) => ({params: {id: `${index}`}})),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {
            id: parseInt(context.params?.id as string)
        }, // will be passed to the page component as props
    }
}


export default QuestionPage;

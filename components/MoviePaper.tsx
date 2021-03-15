import React, {FC, useState, useEffect} from 'react';
import clsx from "clsx";
import {Paper, CircularProgress, Divider, Tooltip, Typography, Link, Button, Box, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {commonStyle} from '../styles/styles';
import {Movie} from '../types/types';
import {getWikipediaInfoById, searchForWikipediaMovie} from '../apis/wikipediaAPI';
import {fetchIMDBFullUrl} from '../apis/imdbAPI';
import {useLazyQuery} from "@apollo/client";
import {GET_MOVIE_QUERY} from "../apis/theMovieDatabaseAPI";
import {shortenString} from "../misc/helper";

type MoviePaperProps = {
    movie: Movie;
    setSearchMovieResult: (data: Movie[] | undefined) => void;
}

type GetMovieQueryVars = {
    id: number;
}

type RelatedMoviesQueryResult = {
    movie: {
        id: number;
        name: string;
        similar: Movie[];
    }
}

const useStyles = makeStyles({
    ...commonStyle,
    paper: {
        width: '60ch',
    },
});

const MoviePaper: FC<MoviePaperProps> = ({movie, setSearchMovieResult}) => {
    const classes = useStyles();
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    const [wikipediaPageId, setWikipediaPageId] = useState<number | null>(null);
    const [wikipediaPageUrl, setWikipediaPageUrl] = useState<string | null>(null);
    const [wikipediaPageExtract, setWikipediaPageExtract] = useState<string | null>(null);
    const [imdbPageUrl, setImdbPageUrl] = useState<string | null>(null);
    const [getMovies, {loading, data}] = useLazyQuery<RelatedMoviesQueryResult, GetMovieQueryVars>(GET_MOVIE_QUERY)

    const releaseYear = movie.releaseDate && (new Date(Date.parse(movie.releaseDate))).getUTCFullYear();

    useEffect(() => {
        const updateWikiUrl: () => void = async () => {
            if (wikipediaPageId) {
                const wikipediaInfo = await getWikipediaInfoById(wikipediaPageId);
                setWikipediaPageUrl(wikipediaInfo.fullurl);
                setWikipediaPageExtract(wikipediaInfo.extract);
            }
        };
        updateWikiUrl();
    }, [wikipediaPageId]);

    useEffect(() => {
        if (data) {
            setSearchMovieResult([]);
            setTimeout(() =>
                setSearchMovieResult(data.movie.similar)
            );
        }
    }, [data]);


    const handleTitleClick = async () => {
        if (!wikipediaPageId) {
            const wikipediaPageId = await searchForWikipediaMovie(movie.name, releaseYear);
            setWikipediaPageId(wikipediaPageId);
            fetchIMDBFullUrl(movie.name, setImdbPageUrl);
        }
        setIsDetailsOpen(!isDetailsOpen);
    }

    const handleRelatedClick = async () =>
        getMovies({variables: {id: movie.id}});

    const concatenatedGenres = movie.genres.map(genre => genre.name).join(', ');

    return (
        <Paper className={clsx(classes.padding, classes.marginBig, classes.paper)}>
            <Link variant="h6" onClick={handleTitleClick} className={clsx(classes.paddingTopSmall, classes.cursorPointer)}>
                {movie.name}
            </Link>
            <Typography variant="body2" gutterBottom>
                {concatenatedGenres}
            </Typography>
            <Tooltip title={`${movie.score} / 10`} arrow>
                <Box component="span">
                    <Rating name="half-rating-read" value={movie.score / 2} precision={0.5} readOnly/>
                </Box>
            </Tooltip>
            {
                isDetailsOpen &&
                <>
                    <Box className={classes.padding}>
                        <Divider variant="middle"/>
                    </Box>
                    <Typography variant="body1" gutterBottom>
                        Details
                    </Typography>
                    {(wikipediaPageExtract && wikipediaPageUrl && imdbPageUrl) ?
                        <>
                            <Typography variant="body2" gutterBottom >
                                {shortenString(wikipediaPageExtract)}
                            </Typography>
                            <Container maxWidth="xs" className={classes.paddingSmall}>
                                <Box component="span" className={classes.margin}>
                                    <Link href={wikipediaPageUrl} target="_blank" rel="noreferrer">
                                        Wikipedia page
                                    </Link>
                                </Box>
                                <Box component="span" className={classes.margin}>
                                    <Link href={imdbPageUrl} target="_blank" rel="noreferrer">
                                        IMDB page
                                    </Link>
                                </Box>
                                <Box component="span" className={classes.margin}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleRelatedClick}
                                        disabled={loading}
                                        endIcon={loading && <CircularProgress size="0.7rem"/>}
                                    >
                                        Related
                                    </Button>
                                </Box>
                            </Container>
                        </>
                        :
                        <CircularProgress/>
                    }
                </>
            }
        </Paper>
    );
};

export default MoviePaper;

import React, {FC, useState, useEffect} from 'react';
import clsx from "clsx";
import {Paper, CircularProgress, Divider, Tooltip, Typography, Link, Button, Box, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { useDispatch } from 'react-redux';
import {commonStyle} from '../styles/styles';
import {Movie, WikipediaSearchResult} from '../types/types';
import {getWikipediaInfoById, searchForWikipediaMovie} from '../apis/wikipediaAPI';
import {getIMDBFullUrl} from '../apis/imdbAPI';
import {useLazyQuery} from "@apollo/client";
import {GET_MOVIE_BY_ID_QUERY} from "../apis/theMovieDatabaseAPI";
import {shortenString} from "../misc/helper";
import { setMovies } from '../store/moviesSlice';
import { AppDispatch } from '../store/store';

type MoviePaperProps = {
    movie: Movie;
}

type GetMovieQueryVars = {
    id: number;
    limit?: number;
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
    widthFitContent: {
        width: 'fit-content',
    }
});

const MoviePaper: FC<MoviePaperProps> = ({ movie }) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    const [wikipediaPageId, setWikipediaPageId] = useState<number | null>(null);
    const [wikipediaInfo, setWikipediaInfo] = useState<WikipediaSearchResult | null>(null);
    const [imdbPageUrl, setImdbPageUrl] = useState<string | null>(null);
    const [fetchRelatedMovies, {loading: isRelatedMoviesLoading, data: relatedMovies}] =
        useLazyQuery<RelatedMoviesQueryResult, GetMovieQueryVars>(GET_MOVIE_BY_ID_QUERY);

    const releaseYear = movie.releaseDate && (new Date(Date.parse(movie.releaseDate))).getUTCFullYear();

    useEffect(() => {
        const updateWikiUrl: () => void = async () => {
            if (wikipediaPageId) {
                const wikipediaInfo = await getWikipediaInfoById(wikipediaPageId);
                setWikipediaInfo(wikipediaInfo);
            }
        };
        updateWikiUrl();
    }, [wikipediaPageId]);

    useEffect(() => {
        if (relatedMovies) {
            dispatch(setMovies([]));
            setTimeout(() =>
                dispatch(setMovies(relatedMovies.movie.similar))
            );
        }
    }, [relatedMovies, dispatch]);


    const handleTitleClick = async () => {
        setIsDetailsOpen(!isDetailsOpen);
        if (!wikipediaPageId) {
            const wikipediaPageId = await searchForWikipediaMovie(movie.title, releaseYear);
            setWikipediaPageId(wikipediaPageId);
            const imdbUrl = await getIMDBFullUrl(movie.title, releaseYear);
            setImdbPageUrl(imdbUrl);
        }
    }

    const handleRelatedClick = async () =>
        fetchRelatedMovies({variables: {id: movie.id}});

    const concatenatedGenres = movie.genres.map(genre => genre.name).join(', ');

    return (
        <Paper className={clsx(classes.paddingBig, classes.marginBig, classes.paper)}>
            <Link variant="h6" onClick={handleTitleClick} className={clsx(classes.paddingTopSmall, classes.cursorPointer)}>
                {movie.title}
            </Link>
            <Typography variant="body2" gutterBottom>
                {concatenatedGenres}
            </Typography>
            <Tooltip title={`${movie.rating} / 10`} arrow>
                <Box component="span">
                    <Rating name="half-rating-read" value={movie.rating / 2} precision={0.5} readOnly/>
                </Box>
            </Tooltip>
            {
                isDetailsOpen &&
                <>
                    <Box className={classes.paddingBig}>
                        <Divider variant="middle"/>
                    </Box>
                    <Typography variant="body1" gutterBottom>
                        Details
                    </Typography>
                    {(wikipediaInfo && imdbPageUrl) ?
                        <>
                            <Typography variant="body2" gutterBottom >
                                {shortenString(wikipediaInfo.extract)}
                            </Typography>
                            <Container className={clsx(classes.paddingSmall, classes.widthFitContent)}>
                                <Box component="span" className={classes.margin}>
                                    <Link href={wikipediaInfo.fullurl} target="_blank" rel="noreferrer">
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
                                        disabled={isRelatedMoviesLoading}
                                        endIcon={isRelatedMoviesLoading && <CircularProgress size="0.7rem"/>}
                                    >
                                        Related movies
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

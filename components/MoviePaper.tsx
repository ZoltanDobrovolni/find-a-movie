import React, { FC, useState, useEffect } from 'react';
import { Paper, CircularProgress, Divider, Tooltip, Typography, Link, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../styles/styles';
import { Movie } from '../types/types';
import {getWikipediaInfoById, searchForWikipediaMovie} from '../apis/wikipediaAPI';
import { getIMDBFullUrl } from '../apis/imdbAPI';
import { useLazyQuery } from "@apollo/client";
import { GET_MOVIE_QUERY } from "../apis/theMovieDatabaseAPI";

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

const MoviePaper: FC<MoviePaperProps> = ({ movie, setSearchMovieResult }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    const [wikipediaPageId, setWikipediaPageId] = useState<number | null>(null);
    const [wikipediaPageUrl, setWikipediaPageUrl] = useState<string | null>(null);
    const [wikipediaPageExtract, setWikipediaPageExtract] = useState<string | null>(null);
    const [imdbPageUrl, setImdbPageUrl] = useState<string | null>(null);
    // const [tmdbMovieId, setTmdbMovieId] = useState<number | null>(null);
    const [getMovies, { loading, error, data }] = useLazyQuery<RelatedMoviesQueryResult, GetMovieQueryVars>(GET_MOVIE_QUERY)


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
            console.log(`Related movies: `, data.movie.similar);
            setSearchMovieResult([]);
            setTimeout(() =>
                setSearchMovieResult(data.movie.similar)
            );
        }
    }, [data]);

    const classes = useStyles();

    const handleTitleClick = async () => {
        if (!wikipediaPageId) {
            console.log(`Searching for movie: ${movie.name}, ${releaseYear}`)
            const wikipediaPageId = await searchForWikipediaMovie(movie.name, releaseYear);
            setWikipediaPageId(wikipediaPageId);
            getIMDBFullUrl(movie.name, setImdbPageUrl);
        }
        setIsDetailsOpen(!isDetailsOpen);
    }

    const handleRelatedClick = async () => {
        console.log(`Searching for related movies: ${movie.id}`)
        getMovies({ variables: { id: movie.id }});
    }

    // const releaseYear = movie.releaseDate && (new Date(Date.parse(movie.releaseDate))).getUTCFullYear();
    const concatenatedGenres = movie.genres.map(genre => genre.name).join(', ');

    return (
        <Paper className={`${classes.padding} ${classes.margin} ${classes.paper}`}>
            <Link onClick={handleTitleClick}>
                {movie.name}
            </Link>
            <br></br>
            <Typography variant="body2" gutterBottom>
                { concatenatedGenres }
            </Typography>

            <Tooltip title={`${movie.score} / 10`} arrow>
                <span>
                    <Rating name="half-rating-read" value={movie.score / 2} precision={0.5} readOnly />
                </span>
            </Tooltip>
            {
                isDetailsOpen &&
                <>
                    <Divider variant="middle" />
                    <Typography variant="body1" gutterBottom>
                        Details
                    </Typography>
                    { (wikipediaPageExtract && wikipediaPageUrl && imdbPageUrl) ?
                        <>
                            <Typography variant="body2" gutterBottom className={classes.overflowEllipsis}>
                                {wikipediaPageExtract}
                            </Typography>
                            <a href={wikipediaPageUrl} target="_blank" rel="noreferrer">
                                Wikipedia page
                            </a>
                            <br></br>
                            <br></br>
                            <a href={imdbPageUrl} target="_blank" rel="noreferrer">
                                IMDB page
                            </a>
                            <Button
                                    onClick={handleRelatedClick}
                                    disabled={loading}
                                    endIcon={loading && <CircularProgress size="0.7rem" />}
                            >
                                Related
                            </Button>
                        </>
                        :
                        <CircularProgress />
                    }
                </>
            }
        </Paper >
    );
}

export default MoviePaper;

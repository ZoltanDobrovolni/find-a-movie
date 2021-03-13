import React, { FC, useState, useEffect } from 'react';
import { Paper, Button, CircularProgress, Divider, Tooltip, Typography, Link } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../styles/styles';
import { Movie } from '../types/types';
import { searchForWikipediaMovie, getWikipediaFullUrl } from '../apis/wikipediaAPI';
import { getIMDBFullUrl } from '../apis/imdbAPI';

type MoviePaperProps = {
    movie: Movie;
}

const MoviePaper: FC<MoviePaperProps> = ({ movie }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    const [detailSnippet, setDetailSnippet] = useState<string | null>(null);
    const [wikipediaPageId, setWikipediaPageId] = useState<number | null>(null);
    const [wikipediaPageUrl, setwikipediaPageUrl] = useState<string | null>(null);
    const [imdbPageUrl, setimdbPageUrl] = useState<string | null>(null);

    useEffect(() => {
        const updateWikiUrl: () => void = async () => {
            if (wikipediaPageId) {
                const url = await getWikipediaFullUrl(wikipediaPageId)
                setwikipediaPageUrl(url);
            }
        };
        updateWikiUrl();
    }, [wikipediaPageId]);

    const classes = useStyles();

    const handleTitleClick = async () => {
        if (!detailSnippet) {
            const wikipediaResult = await searchForWikipediaMovie(movie.name);
            setDetailSnippet(wikipediaResult.snippet);
            setWikipediaPageId(wikipediaResult.pageid);

            getIMDBFullUrl(movie.name, setimdbPageUrl);
        }
        setIsDetailsOpen(!isDetailsOpen);
    }

    // const releaseYear = movie.releaseDate && (new Date(Date.parse(movie.releaseDate))).getUTCFullYear();
    const concatenatedGenres = movie.genres.map(genre => genre.name).join(', ');

    return (
        <Paper className={`${classes.padding} ${classes.margin}`}>
            {/*<Button color="primary" onClick={handleTitleClick}>{movie.name}</Button>*/}
            <Link href="#" onClick={handleTitleClick}>
                {movie.name}
            </Link>
            <br></br>
            <Typography variant="body1" gutterBottom>
                { concatenatedGenres }
            </Typography>

            <Tooltip title={`${movie.score} / 10`} arrow>
                <span>
                    <Rating name="half-rating-read" value={movie.score / 2} precision={0.5} readOnly />
                </span>
            </Tooltip>
            {/* <p> */}
                {/* {`Release year: ${releaseYear || 'unknown'}`} */}
            {/* </p> */}
            {
                isDetailsOpen &&
                <>
                    <Divider variant="middle" />
                    <h4>Details</h4>
                    { (detailSnippet && wikipediaPageUrl && imdbPageUrl) ?
                        <>
                            <p>
                                {detailSnippet}
                            </p>
                            <a href={wikipediaPageUrl} target="_blank" rel="noreferrer">
                                Wikipedia page
                            </a>
                            <br></br>
                            <br></br>
                            <a href={imdbPageUrl} target="_blank" rel="noreferrer">
                                IMDB page
                            </a>
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

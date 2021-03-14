import React, { FC, useState, useEffect } from 'react';
import { Paper, CircularProgress, Divider, Tooltip, Typography, Link } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useStyles from '../styles/styles';
import { Movie } from '../types/types';
import {getWikipediaInfoById, searchForWikipediaMovie} from '../apis/wikipediaAPI';
import { getIMDBFullUrl } from '../apis/imdbAPI';

type MoviePaperProps = {
    movie: Movie;
}

const MoviePaper: FC<MoviePaperProps> = ({ movie }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    // const [detailSnippet, setDetailSnippet] = useState<string | null>(null);
    const [wikipediaPageId, setWikipediaPageId] = useState<number | null>(null);
    const [wikipediaPageUrl, setwikipediaPageUrl] = useState<string | null>(null);
    const [wikipediaPageExtract, setwikipediaPageExtract] = useState<string | null>(null);
    const [imdbPageUrl, setimdbPageUrl] = useState<string | null>(null);
    const releaseYear = movie.releaseDate && (new Date(Date.parse(movie.releaseDate))).getUTCFullYear();

    useEffect(() => {
        const updateWikiUrl: () => void = async () => {
            if (wikipediaPageId) {
                const wikipediaInfo = await getWikipediaInfoById(wikipediaPageId);
                setwikipediaPageUrl(wikipediaInfo.fullurl);
                setwikipediaPageExtract(wikipediaInfo.extract);
            }
        };
        updateWikiUrl();
    }, [wikipediaPageId]);

    const classes = useStyles();

    const handleTitleClick = async () => {
        if (!wikipediaPageId) {
            console.log(`Searching for movie: ${movie.name}, ${releaseYear}`)
            const wikipediaPageId = await searchForWikipediaMovie(movie.name, releaseYear);
            setWikipediaPageId(wikipediaPageId);
            getIMDBFullUrl(movie.name, setimdbPageUrl);
        }
        setIsDetailsOpen(!isDetailsOpen);
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

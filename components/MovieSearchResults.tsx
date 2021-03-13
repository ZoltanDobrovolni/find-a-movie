import React, { FC } from 'react';
import { SearchResult, Movie } from '../types/types';
import MoviePaper from './MoviePaper';

type MovieSearchResultProps = {
    allMovies: Movie[];
}

const MovieSearchResults: FC<MovieSearchResultProps> = ({ allMovies }) => {
    return (
        <>
            {allMovies.map(movie => (
                <MoviePaper movie={movie} key={movie.id} />
            ))}
        </>
    );
}

export default MovieSearchResults;

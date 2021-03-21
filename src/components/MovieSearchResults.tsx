import React, { FC } from 'react';
import { Movie } from '../types/types';
import MoviePaper from './MoviePaper';

type MovieSearchResultProps = {
    movies: Movie[];
    setMovies: (movies: Movie[] | undefined) => void;
}

const MovieSearchResults: FC<MovieSearchResultProps> = ({ movies, setMovies }) => {
    return (
        <>
            {movies.map(movie => (
                <MoviePaper movie={movie} key={movie.id} setMovies={setMovies}/>
            ))}
        </>
    );
}

export default MovieSearchResults;

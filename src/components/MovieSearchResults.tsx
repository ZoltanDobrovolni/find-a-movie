import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectMovies } from '../store/moviesSlice';
import { Movie } from '../types/types';
import MoviePaper from './MoviePaper';

const MovieSearchResults: FC = () => {
    const movies = useSelector(selectMovies);
    
    return (
        <>
            {movies.map(movie => (
                <MoviePaper movie={movie} key={movie.id} />
            ))}
        </>
    );
}

export default MovieSearchResults;

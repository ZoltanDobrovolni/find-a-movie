import React, { FC } from 'react';
import { Movie } from '../types/types';
import MoviePaper from './MoviePaper';

type MovieSearchResultProps = {
    allMovies: Movie[];
    setSearchMovieResult: (data: Movie[] | undefined) => void;
}

const MovieSearchResults: FC<MovieSearchResultProps> = ({ allMovies, setSearchMovieResult }) => {
    return (
        <>
            {allMovies.map(movie => (
                <MoviePaper movie={movie} key={movie.id} setSearchMovieResult={setSearchMovieResult}/>
            ))}
        </>
    );
}

export default MovieSearchResults;

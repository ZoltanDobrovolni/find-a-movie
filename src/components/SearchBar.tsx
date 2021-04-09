import React, { FC, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {
    IconButton,
    CircularProgress,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import {commonStyle} from '../styles/styles';
import { MoviesSearchQueryResult } from '../types/types';
import { SEARCH_MOVIE_QUERY } from '../apis/theMovieDatabaseAPI';
import clsx from "clsx";
import { setMovies } from '../store/moviesSlice';

type SearchButtonEventHandler = () => void;
type InputChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type MoviesSearchQueryVars = {
    title: string;
}

const useStyles = makeStyles({
    ...commonStyle,
    searchInputField: {
        width: '40ch',
    },
});

const SearchBar : FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [fetchMovies, { loading, data: movies }] = useLazyQuery<MoviesSearchQueryResult, MoviesSearchQueryVars>(
        SEARCH_MOVIE_QUERY
    );

    useEffect(() => {
        if (movies) {
            dispatch(setMovies(movies.searchMovies));
        }
    }, [movies, dispatch]);

    const handleSearch: SearchButtonEventHandler = () =>
        fetchMovies({ variables: { title: searchInputValue }});

    const handleSubmit = e => {
        e.preventDefault();
        handleSearch();
    };

    const handleSearchInputChange: InputChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => setSearchInputValue(event.target.value);

    return (
        <FormControl
            component="form"
            className={clsx(classes.margin, classes.searchInputField)}
            variant="outlined"
            disabled={loading} onSubmit={handleSubmit}
        >
            <InputLabel htmlFor="movie-search-input">Search</InputLabel>
            <OutlinedInput
                id="movie-search-input"
                type="text"
                value={searchInputValue}
                onChange={handleSearchInputChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Search"
                            onClick={handleSearch}
                            edge="end"
                            disabled={loading}
                        >
                            { loading ?
                                <CircularProgress size="1rem"/>
                                :
                                <SearchIcon/>
                            }
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
            />
        </FormControl>
    );
};

export default SearchBar;

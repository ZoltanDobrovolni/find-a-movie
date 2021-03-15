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
import { useLazyQuery } from '@apollo/client';
import {commonStyle} from '../styles/styles';
import { Movie, MoviesSearchQueryResult } from '../types/types';
import { SEARCH_MOVIE_QUERY } from '../apis/theMovieDatabaseAPI';
import clsx from "clsx";

type SearchButtonEventHandler = () => void;
type InputChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type MoviesSearchQueryVars = {
    title: string;
}
type SearchBarProps = {
    handleSearchResultChange: (movies: Movie[] | undefined) => void;
}

const useStyles = makeStyles({
    ...commonStyle,
    searchInputField: {
        width: '40ch',
    },
});

const SearchBar : FC<SearchBarProps> = ({ handleSearchResultChange }) => {
    const classes = useStyles();
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [fetchMovies, { loading, data: movies }] = useLazyQuery<MoviesSearchQueryResult, MoviesSearchQueryVars>(
        SEARCH_MOVIE_QUERY
    );

    useEffect(() => {
        if (movies) {
            handleSearchResultChange(movies.searchMovies);
        }
    }, [movies, handleSearchResultChange]);

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

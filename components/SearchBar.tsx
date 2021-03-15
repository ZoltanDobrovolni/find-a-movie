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
import { useLazyQuery } from '@apollo/client';
import useStyles from '../styles/styles';
import { Movie, MoviesSearchQueryResult } from '../types/types';
import { SEARCH_MOVIE_QUERY } from '../apis/theMovieDatabaseAPI';
import clsx from "clsx";

type SearchButtonEventHandler = () => void;
type InputChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type MoviesSearchQueryVars = {
    title: string;
}
type SearchBarProps = {
    handleSearchResultChange: (data: Movie[] | undefined) => void;
}

const SearchBar : FC<SearchBarProps> = ({ handleSearchResultChange }) => {
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const classes = useStyles();

    const [getMovies, { loading, error, data }] = useLazyQuery<MoviesSearchQueryResult, MoviesSearchQueryVars>(
        SEARCH_MOVIE_QUERY
    );

    useEffect(() => {
        // console.error(error);
        if (loading) {

        }
        if (data) {
            console.log(data.searchMovies)
            handleSearchResultChange(data.searchMovies);
        }
    }, [data, handleSearchResultChange, error, loading]);

    const handleSearch: SearchButtonEventHandler = () => {
        getMovies({ variables: { title: searchInputValue }});
    }

    const handleSubmit = e => {
        e.preventDefault();
        handleSearch();
    };

    const handleSearchInputChange: InputChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => setSearchInputValue(event.target.value);

    return (
        <>
        <FormControl component="form" className={clsx(classes.margin, classes.textField)} variant="outlined" disabled={loading} onSubmit={handleSubmit}>
            <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
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
        </>
    );
};

export default SearchBar;

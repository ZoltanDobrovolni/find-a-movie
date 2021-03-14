import React, { FC, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, IconButton, InputBase, CircularProgress, Box } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';
import useStyles from '../styles/styles';
import { Movie, MoviesSearchQueryResult } from '../types/types';
import { SEARCH_MOVIE_QUERY } from '../apis/theMovieDatabaseAPI';

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
        <Paper component="form" onSubmit={handleSubmit} className={classes.searchPaper}>
            <InputBase
                className={classes.input}
                placeholder="Search Your Movie"
                inputProps={{ 'aria-label': 'search google maps' }}
                disabled={loading}
                value={searchInputValue}
                onChange={handleSearchInputChange}
            />
            {loading ?
                <Box component="span" m={1} className={classes.searchBarSpinner}>
                    <CircularProgress size="1rem" />
                </Box>
                :
                <IconButton onClick={handleSearch} disabled={loading} className={classes.iconButton} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            }
        </Paper>
    );
}

export default SearchBar;

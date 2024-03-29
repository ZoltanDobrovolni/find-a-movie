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
import { MoviesSearchQueryResult, SEARCH_MOVIE_BY_TITLE_QUERY } from '../apis/theMovieDatabaseAPI';
import { setMovies } from '../store/moviesSlice';
import { AppDispatch } from '../store/store';

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
    const dispatch = useDispatch<AppDispatch>();
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [fetchMovies, { loading, data: searchResult }] = useLazyQuery<MoviesSearchQueryResult, MoviesSearchQueryVars>(
        SEARCH_MOVIE_BY_TITLE_QUERY
    );

    useEffect(() => {
        if (searchResult) {
            const extractedMovies = searchResult.movies.search.edges.map(edge => edge.node);
            dispatch(setMovies(extractedMovies));
        }
    }, [searchResult, dispatch]);

    const handleSearch: SearchButtonEventHandler = () => {
        try {
            fetchMovies({ variables: { title: searchInputValue }});
        } catch (error) {
            console.error(error);
        }
    }

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

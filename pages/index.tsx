import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import useStyles from '../styles/styles';
import SearchBar from '../components/SearchBar';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import MovieSearchResults from '../components/MovieSearchResults';
import {TMDBW_URL} from '../apis/theMovieDatabaseAPI';
import {Movie, SearchResult} from '../types/types';

const client = new ApolloClient({
    uri: TMDBW_URL,
    cache: new InMemoryCache(),
});

const Home = () => {
    const [searchMovieResult, setSearchMovieResult] = useState<Movie[]>([]);
    const classes = useStyles();

    return (
        <ApolloProvider client={client}>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={3}
                  className={classes.padding}>
                <Grid item xs={12}>
                    <h1>
                        Find a movie
                    </h1>
                </Grid>
                <Grid item xs={12}>
                    <SearchBar handleSearchResultChange={(setSearchMovieResult)}/>
                </Grid>
                <Grid item xs={12}>
                    {searchMovieResult &&
                    <MovieSearchResults allMovies={searchMovieResult}/>
                    }
                </Grid>
            </Grid>
        </ApolloProvider>
    );
}

export default Home;

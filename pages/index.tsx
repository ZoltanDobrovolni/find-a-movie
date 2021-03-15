import React, {useState} from 'react';
import {Grid, Box, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {commonStyle} from '../styles/styles';
import SearchBar from '../components/SearchBar';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import MovieSearchResults from '../components/MovieSearchResults';
import {TMDBW_URL} from '../apis/theMovieDatabaseAPI';
import {Movie} from '../types/types';

const client = new ApolloClient({
    uri: TMDBW_URL,
    cache: new InMemoryCache(),
});

const useStyles = makeStyles(commonStyle);

const Home = () => {
    const [searchMovieResult, setSearchMovieResult] = useState<Movie[]>([]);
    const classes = useStyles();

    return (
        <ApolloProvider client={client}>
            <Box>
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing={3}
                      className={classes.padding}>
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            Find a movie
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchBar handleSearchResultChange={(setSearchMovieResult)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <MovieSearchResults allMovies={searchMovieResult} setSearchMovieResult={setSearchMovieResult}/>
                    </Grid>
                </Grid>
            </Box>
        </ApolloProvider>
    );
}

export default Home;

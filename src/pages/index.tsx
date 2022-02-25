import React from 'react';
import {Grid, Box, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {store} from '../store/store';
import {Provider} from 'react-redux';
import {commonStyle} from '../styles/styles';
import SearchBar from '../components/SearchBar';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import MovieSearchResults from '../components/MovieSearchResults';
import {THE_MOVIE_DATABASE_URL} from '../apis/theMovieDatabaseAPI';

const client = new ApolloClient({
    uri: THE_MOVIE_DATABASE_URL,
    cache: new InMemoryCache(),
});

const useStyles = makeStyles(commonStyle);

const Home = () => {
    const classes = useStyles();

    return (
        <React.StrictMode>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <Box>
                        <Grid container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={3}
                              className={classes.padding}>
                            <Grid item xs={12}>
                                <Typography variant="h3">
                                    Find a movie
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <SearchBar />
                            </Grid>
                            <Grid item xs={12}>
                                <MovieSearchResults />
                            </Grid>
                        </Grid>
                    </Box>
                </ApolloProvider>
            </Provider>
        </React.StrictMode>
    );
}

export default Home;

import {gql} from '@apollo/client';

export const TMDBW_URL = 'https://tmdb.sandbox.zoosh.ie/dev/graphql';

export const SEARCH_MOVIE_QUERY = gql`
query myCustomSearch($title: String!) {
    searchMovies(query: $title) {
        id
        name
        releaseDate
        score
        votes
        genres {
            name
        }
    }
}
`;

export const GET_MOVIE_QUERY = gql`
query myCustomSearch($id: ID!) {
    movie(id: $id) {
        id
        name
        similar(limit: 10) {
            id
            name
            releaseDate
            score
            votes
            genres {
                name
            }
        }
    }
}
`;

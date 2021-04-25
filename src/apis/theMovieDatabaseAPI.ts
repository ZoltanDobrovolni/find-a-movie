import {gql} from '@apollo/client';

export const THE_MOVIE_DATABASE_URL = 'https://tmdb.sandbox.zoosh.ie/dev/graphql';

export const SEARCH_MOVIE_BY_TITLE_QUERY = gql`
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

export const GET_MOVIE_BY_ID_QUERY = gql`
query myCustomSearch($id: ID!, $limit: Int = 10) {
    movie(id: $id) {
        id
        name
        similar(limit: $limit) {
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

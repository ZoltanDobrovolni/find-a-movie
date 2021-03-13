import { gql } from '@apollo/client';

export const TMDBW_URL = 'https://tmdb.sandbox.zoosh.ie/dev/graphql';

export const SEARCH_MOVIE_QUERY = gql`
query myCustomSearch($title: String!) {
    searchMovies(query: $title) {
    id
    name
    overview
    tagline
    releaseDate
    score
    votes
    genres {
      name
    }
  }
}
`;
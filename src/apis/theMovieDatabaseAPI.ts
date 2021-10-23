import { gql } from "@apollo/client";
import { Movie } from "../types/types";

export const THE_MOVIE_DATABASE_URL = "https://tmdb.apps.quintero.io/";

export type SearchQueryResult<T> = {
  search: {
    edges: {
      node: T;
    }[];
  };
};

export type MoviesSearchQueryResult = {
  movies: SearchQueryResult<Movie>;
};

export const SEARCH_MOVIE_BY_TITLE_QUERY = gql`
  query myCustomSearch($title: String!) {
    movies {
      search(term: $title) {
        edges {
          cursor
          node {
            id
            title
            releaseDate
            rating
            genres {
              name
            }
          }
        }
        totalCount
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

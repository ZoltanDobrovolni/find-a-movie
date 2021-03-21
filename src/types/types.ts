
export type Movie = {
    id: number;
    name: string;
    releaseDate: string;
    score: number;
    votes: number;
    genres: MovieGenre[];
};

type MovieGenre = {
    id: number;
    name: string;
}

export type MoviesSearchQueryResult = {
    searchMovies: Movie[];
}

export type WikipediaSearchResult = {
    pageid: number;
    fullurl: string;
    extract: string;
}

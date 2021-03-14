
export type Movie = {
    id: number;
    name: string;
    releaseDate: string;
    score: number;
    // similar: any[];
    votes: number;
    genres: any[]; // todo
};

export type SearchResult<T> = {
    totalPages: number;
    totalResults: number;
    page: number;
    results: T[];
};

export type MoviesSearchQueryResult = {
    searchMovies: Movie[];
    //     allMovies: SearchResult<Movie>;
}

export type WikipediaSearchResult = {
    pageid: number;
    fullurl: string;
    extract: string;
}

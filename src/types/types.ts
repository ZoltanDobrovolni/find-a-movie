
export type Movie = {
    id: number;
    title: string;
    releaseDate: string;
    rating: number;
    genres: MovieGenre[];
};

type MovieGenre = {
    id: number;
    name: string;
}


export type WikipediaSearchResult = {
    pageid: number;
    fullurl: string;
    extract: string;
}

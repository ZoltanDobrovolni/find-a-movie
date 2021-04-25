import axios from 'axios';

export const getIMDBFullUrl = async (movieTitle: string, year: number): Promise<string> => {
    const BASE_URL = 'https://www.omdbapi.com'
    const params =  {
        t: movieTitle,
        y: year,
        apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    };
    try {
        const result = await axios.get(BASE_URL,  { params });
        return `https://www.imdb.com/title/${result.data.imdbID}`;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

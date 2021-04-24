import axios from 'axios';

export const fetchIMDBFullUrl = (movieTitle: string, updateIMDBUrlCallback: (imdbUrl: string) => void): void => {
    const sanitizedMovieTitle = movieTitle.toLowerCase().replace(/\W/g, '');
    function addScript(src: string) { var s = document.createElement('script'); s.src = src; document.head.appendChild(s); }
    // @ts-ignore
    window[`imdb$${sanitizedMovieTitle}`] = function (results) {
        const firstResult = results.d[0];
        const fullIMDBUrl = `https://www.imdb.com/title/${firstResult.id}`;
        updateIMDBUrlCallback(fullIMDBUrl);
    };
    const firstCharacterOfTitle = sanitizedMovieTitle.split('')[0];
    addScript(`https://sg.media-imdb.com/suggests/${firstCharacterOfTitle}/${sanitizedMovieTitle}.json`);
}

export const getIMDBFullUrl = async (movieTitle: string, year: number): Promise<string> => {
    console.log('AAAAAAAApi key: ', process.env.VERCEL_ENV, process.env.NEXT_PUBLIC_OMDB_API_KEY, process.env.OMDB_API_KEY);
    const BASE_URL = 'http://www.omdbapi.com'
    const params =  {
        t: movieTitle,
        y: year,
        apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    };
    try {
        const result = await axios.get(BASE_URL,  { params });
        console.log('RRRRRRRRRresult: ', `https://www.imdb.com/title/${result.data.imdbID}`);
        return `https://www.imdb.com/title/${result.data.imdbID}`;
        // const imdbid = result.data.imdbID;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

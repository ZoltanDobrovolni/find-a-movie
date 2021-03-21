import axios from 'axios';
import { WikipediaSearchResult } from '../types/types';

const BASE_URL = 'https://en.wikipedia.org/w/api.php';

export const searchForWikipediaMovie = async (movieTitle: string, releaseYear: number): Promise<number> => {
    const params =  {
        action: 'query',
        list: 'search',
        srsearch: `${movieTitle} movie ${releaseYear}`,
        format: 'json',
        origin: '*',
    };
    try {
        const result = await axios.get(BASE_URL,  { params });
        const firstResult = result.data.query.search[0];
        return firstResult.pageid;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const getWikipediaInfoById = async (pageId: number): Promise<WikipediaSearchResult> => {
    const params =  {
        action: 'query',
        prop: 'info|extracts',
        pageids: pageId,
        inprop: 'url',
        format: 'json',
        explaintext: true,
        exintro: true,
        origin: '*',
    };
    try {
        const result = await axios.get(BASE_URL,  { params });
        const [ wikiData ] = Object.values(result.data.query.pages);
        return wikiData as WikipediaSearchResult;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}
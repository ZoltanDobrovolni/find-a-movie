import axios from 'axios';
import { WikipediaSearchResult } from '../types/types';

const BASE_URL = 'https://en.wikipedia.org/w/api.php';

export const searchForWikipediaMovie = async (movieTitle: string): Promise<WikipediaSearchResult> => {
    const params =  {
        action: 'query',
        list: 'search',
        srsearch: `${movieTitle} movie`,
        format: 'json',
    };
    try {

        const result = await axios.get(BASE_URL,  { params });
        const firstResult = result.data.query.search[0];
        console.log("XXXXXXXXXXXX", firstResult.snippet);
        return {
            snippet: firstResult.snippet,
            pageid: firstResult.pageid,
        };
    } catch (error) {
        console.error(error);
        return {
            snippet: 'mock_snippet',
            pageid: 123456789,
        };
    }
}

export const getWikipediaFullUrl = async (pageId: number): Promise<string> => {
    const params =  {
        action: 'query',
        prop: 'info',
        pageids: pageId,
        inprop: 'url',
    };
    try {
        const result = await axios.get(BASE_URL,  { params });
        console.log(result.data.query.pages[pageId].fullurl);
        return result.data.query.pages[pageId].fullurl;
    } catch (error) {
        console.error(error);
        return 'mock_url';
    }
}

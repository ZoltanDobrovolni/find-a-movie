import axios from 'axios';
import { WikipediaSearchResult } from '../types/types';

const BASE_URL = 'https://en.wikipedia.org/w/api.php';

export const searchForWikipediaMovie = async (movieTitle: string): Promise<WikipediaSearchResult> => {
    const params =  {
        action: 'query',
        list: 'search',
        srsearch: `${movieTitle} movie`,

        format: 'json',
        origin: '*',
    };
    try {

        const result = await axios.get(BASE_URL,  { params });
        // console.log("XXXXXXXXXXXX", result);
        const firstResult = result.data.query.search[0];
        // data.query.search[0].pageid
        // console.log("XXXXXXXXXXXX", firstResult.snippet);
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
        // titles: '', // todo can i remove pageId 'round',
        inprop: 'url',
        format: 'json',
        origin: '*',
    };
    try {
        const result = await axios.get(BASE_URL,  { params });
        // console.log(result);
        // console.log(result.data.query.pages[pageId].fullurl);
        return result.data.query.pages[pageId].fullurl;
    } catch (error) {
        console.error(error);
        return 'mock_url';
    }
}

export const getWikipediaPageExtract = async (pageId: number): Promise<string> => {
    const params =  {
        action: 'query',
        prop: 'extracts',
        pageids: pageId,
        inprop: 'url',
        format: 'json',
        explaintext: true,
        exintro: true,
        origin: '*',
    };
    try {
        const result = await axios.get(BASE_URL,  { params });
        console.log('EEEEEEEEEEExtract: ');
        console.log(result.data.query.pages[pageId].extract);
        return result.data.query.pages[pageId].extract;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}
//
// export const getWikipediaFullUrlByTitle = async (title: string): Promise<string> => {
//     const params =  {
//         action: 'query',
//         prop: 'pageprops',
//         titles: title,
//         // inprop: 'url',
//         format: 'json',
//         origin: '*',
//     };
//     // https://en.wikipedia.org/w/api.php?action=query&prop=info&titles=Stack_Overflow
//     // https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&titles=Kofoworola_Abeni_Pratt&format=json
//     try {
//         const result = await axios.get(BASE_URL,  { params });
//         console.log('By title:', result);
//         // console.log(result.data.query.pages[pageId].fullurl);
//         return result.data.query.fullurl;
//     } catch (error) {
//         console.error(error);
//         return 'mock_url';
//     }
// }

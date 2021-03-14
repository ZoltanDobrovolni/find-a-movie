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
        // console.log(result.data.query.pages);
        const [ wikiData ] = Object.values(result.data.query.pages);
        // console.log(wikiData);
        return wikiData as WikipediaSearchResult;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}
// export const getWikipediaInfoByTitle = async (movieTitle: string): Promise<WikipediaSearchResult> => {
//     const params =  {
//         action: 'query',
//         // prop: 'info',
//         // prop: 'extracts',
//         prop: 'info|extracts',
//         // pageids: movieTitle,
//         // titles: movieTitle, // todo can i remove movieTitle 'round',
//         titles: movieTitle, // todo can i remove movieTitle 'round',
//         // srsearch: `${movieTitle} movie`,
//         inprop: 'url',
//         format: 'json',
//         explaintext: true,
//         exintro: true,
//         origin: '*',
//     };
//     try {
//         const result = await axios.get(BASE_URL,  { params });
//         console.log(result.data.query.pages);
//         const [ wikiData ] = Object.values(result.data.query.pages);
//         console.log(wikiData);
//         return wikiData as WikipediaSearchResult;
//     } catch (error) {
//         console.error(error);
//         return Promise.reject(error);
//     }
// }
//
// export const getWikipediaPageExtract = async (pageId: string): Promise<string> => {
//     const params =  {
//         action: 'query',
//         prop: 'extracts',
//         // pageids: pageId,
//         titles: pageId, // todo can i remove pageId 'round',
//         inprop: 'url',
//         format: 'json',
//         explaintext: true,
//         exintro: true,
//         origin: '*',
//     };
//     try {
//         const result = await axios.get(BASE_URL,  { params });
//         console.log('EEEEEEEEEEExtract: ');
//         console.log(result.data.query.pages[pageId].extract);
//         return result.data.query.pages[pageId].extract;
//     } catch (error) {
//         console.error(error);
//         return Promise.reject(error);
//     }
// }
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

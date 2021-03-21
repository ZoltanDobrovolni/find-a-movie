
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

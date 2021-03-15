
export const shortenString = (longText: string, minimumLengthOfShortenedText = 400) => {
    const indexOfDot = longText.indexOf('.', minimumLengthOfShortenedText);
    return longText.substring(0, indexOfDot).concat('...');
}
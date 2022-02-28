import { Movie } from "../types/types";

export const movieFactory = ({
  id = getRandomInteger(),
  title = getRandomString(),
  releaseDate = "02-02-2202",
  rating = 10,
  genres = [],
}: Partial<Movie> = {}): Movie => ({ id, title, releaseDate, rating, genres });

export function getRandomInteger(
  minimum = 1,
  maximum = Number.MAX_SAFE_INTEGER
): number {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomString(): string {
  return Math.random().toString(36).substring(2, 15);
}

import React from "react";
import TestRenderer from "react-test-renderer";
import * as reactRedux from "react-redux";
import "@testing-library/jest-dom";
import MovieSearchResults from "./MovieSearchResults";
import MoviePaper from "./MoviePaper";
import { movieFactory } from "../misc/testHelper";

jest.mock('./MoviePaper', () => () => '<p>mocked paper</p>');

describe("Test MoviePaper component", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  test("that MoviePaper gets the proper movie props", () => {
    const mockedMovie = movieFactory();
    useSelectorMock.mockReturnValue([mockedMovie]);
    const testRenderer = TestRenderer.create(<MovieSearchResults />);

    const testInstance = testRenderer.root;
    expect(testInstance.findByType(MoviePaper).props).toEqual(
      expect.objectContaining({
        movie: mockedMovie,
      })
    );
  });

  test.each([0, 1, 100])("Test that component renders as many MoviePaper as many Movie is provided by store. %#", (numberOfMovies) => {
    const expectedLength = numberOfMovies;
    const moviesArray = (new Array(numberOfMovies)).fill(movieFactory);
    useSelectorMock.mockReturnValue(moviesArray);
    const testRenderer = TestRenderer.create(<MovieSearchResults />);

    const testInstance = testRenderer.root;
    expect(testInstance.findAllByType(MoviePaper).length).toEqual(expectedLength);
  });
});

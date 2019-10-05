import { action } from "typesafe-actions";
import {
  fetchBackground,
  fetchBackgroundSuccess,
  fetchBackgroundError
} from "../actions";
import { EditorCurrentActionTypes } from "../types";

import configureStore from "redux-mock-store";

const mockStore = configureStore();
const store = mockStore();

describe("Background actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
  });

  it("Dispatches the correct action", () => {
    const expectedAction = action(
      EditorCurrentActionTypes.FETCH_BACKGROUND,
      [],
      {
        method: "get",
        route: "/random?sig=1"
      }
    );

    store.dispatch(fetchBackground());
    expect(store.getActions()).toEqual([expectedAction]);
  });

  it("Should create an success action", () => {
    const backgroundData = { imageUrl: "test" };
    const expectedAction = action(
      EditorCurrentActionTypes.FETCH_BACKGROUND_SUCCESS,
      backgroundData
    );

    expect(fetchBackgroundSuccess(backgroundData)).toEqual(expectedAction);
  });

  it("Should create an error action", () => {
    const backgroundData = "testError";
    const expectedAction = action(
      EditorCurrentActionTypes.FETCH_BACKGROUND_ERROR,
      backgroundData
    );

    expect(fetchBackgroundError("testError")).toEqual(expectedAction);
  });
});

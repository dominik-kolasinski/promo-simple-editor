import { action } from "typesafe-actions";
import { uniqueId } from "lodash";
import {
  EditorCurrentActionTypes,
  BackgroundRaw,
  WorkbenchItem
} from "./types";

export const fetchBackground = (terms?: string) => {
  return action(EditorCurrentActionTypes.FETCH_BACKGROUND, [], {
    method: "get",
    route: `random?sig=${uniqueId()}`
  });
};
export const fetchBackgroundSuccess = (img: BackgroundRaw) =>
  action(EditorCurrentActionTypes.FETCH_BACKGROUND_SUCCESS, img);

export const fetchBackgroundError = (message: string) =>
  action(EditorCurrentActionTypes.FETCH_BACKGROUND_ERROR, message);

export const removeFetchedBackgrounds = () =>
  action(EditorCurrentActionTypes.REMOVE_FETCHED_BACKGROUNDS);

export const setBackgroundImage = (imageUrl: string) =>
  action(EditorCurrentActionTypes.SET_BACKGROUND_IMAGE, imageUrl);

export const removeBackgroundImage = () =>
  action(EditorCurrentActionTypes.REMOVE_BACKGROUND_IMAGE);

export const addWorkbenchItem = (add: WorkbenchItem) =>
  action(EditorCurrentActionTypes.ADD_WORKBENCH_ITEM, add);

export const updateWorkbenchItem = (update: WorkbenchItem, id?: string) =>
  action(EditorCurrentActionTypes.UPDATE_WORKBENCH_ITEM, { update, id });

export const removeWorkbenchItem = (id: string) =>
  action(EditorCurrentActionTypes.REMOVE_WORKBENCH_ITEM, id);

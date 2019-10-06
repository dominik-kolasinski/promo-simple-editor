import { MetaAction } from "..";

export type ApiResponse = Record<string, any>;

export interface BackgroundRaw extends ApiResponse {
  imageUrl: string;
}

export interface Dimensions {
  height?: number;
  width?: number;
}

export interface TextSettings {
  value?: string;
  font?: string;
  fontSize?: number;
  fontColor?: string;
  fontStyle?: string;
}

export interface LogoSettings {
  imageUrl: string;
  dimensions?: Dimensions;
}

export interface WorkbenchItem {
  id?: string;
  top?: number;
  left?: number;
  type: string;
  textSettings?: TextSettings;
  logoSettings?: LogoSettings;
}

export interface EditorCurrentState {
  images: BackgroundRaw[];
  readonly loading: boolean;
  readonly errors: [];
  workbenchBackground: string | null;
  workbenchItems: WorkbenchItem[];
}

export const EditorCurrentActionTypes = {
  // fetching from api related actions
  FETCH_BACKGROUND: "@@editorCurrent/FETCH_BACKGROUND",
  FETCH_BACKGROUND_SUCCESS: "@@editorCurrent/FETCH_BACKGROUND_SUCCESS",
  FETCH_BACKGROUND_ERROR: "@@editorCurrent/FETCH_BACKGROUND_ERROR",
  REMOVE_FETCHED_BACKGROUNDS: "@@editorCurrent/REMOVE_FETCHED_BACKGROUNDS",

  // editor related actions
  SET_BACKGROUND_IMAGE: "@@editorCurrent/SET_BACKGROUND_IMAGE",
  REMOVE_BACKGROUND_IMAGE: "@@editorCurrent/REMOVE_BACKGROUND_IMAGE",
  ADD_WORKBENCH_ITEM: "@@editorCurrent/ADD_WORKBENCH_ITEM",
  UPDATE_WORKBENCH_ITEM: "@@editorCurrent/UPDATE_WORKBENCH_ITEM",
  REMOVE_WORKBENCH_ITEM: "@@editorCurrent/REMOVE_WORKBENCH_ITEM"
};

export interface EditorCurrentDispatchToProps {
  fetchBackground: (terms?: string) => MetaAction;
  removeFetchedBackgrounds: () => void;
  setBackgroundImage: (imageUrl: string) => void;
  removeBackgroundImage: () => void;
  addWorkbenchItem: (add: WorkbenchItem) => void;
  updateWorkbenchItem: (update: WorkbenchItem, id: string) => void;
  removeWorkbenchItem: (id: string) => void;
}

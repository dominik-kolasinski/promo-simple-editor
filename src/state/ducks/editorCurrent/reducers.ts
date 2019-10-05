import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import {
  BackgroundRaw,
  EditorCurrentState,
  EditorCurrentActionTypes
} from "./types";

export const initialState: EditorCurrentState = {
  images: [],
  errors: [],
  loading: true,
  workbenchBackground: null,
  workbenchItems: []
};

export const editorCurrentReducer = (
  state: EditorCurrentState = initialState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, any | BackgroundRaw>
): EditorCurrentState => {
  switch (action.type) {
    case EditorCurrentActionTypes.FETCH_BACKGROUND_SUCCESS: {
      return {
        ...state,
        images: [...state.images, action.payload],
        loading: state.images.length < 3 ? true : false
      };
    }
    case EditorCurrentActionTypes.FETCH_BACKGROUND_ERROR: {
      return {
        ...state
      };
    }
    case EditorCurrentActionTypes.SET_BACKGROUND_IMAGE: {
      return { ...state, workbenchBackground: action.payload };
    }
    case EditorCurrentActionTypes.REMOVE_BACKGROUND_IMAGE: {
      return { ...state, workbenchBackground: null };
    }

    case EditorCurrentActionTypes.ADD_WORKBENCH_ITEM: {
      const items = [...state.workbenchItems, action.payload];

      return {
        ...state,
        workbenchItems: items
      };
    }

    case EditorCurrentActionTypes.UPDATE_WORKBENCH_ITEM: {
      let items;

      if (action.payload.update.type === "text") {
        items = state.workbenchItems.map(item => {
          if (item.type !== "text") {
            return item;
          } else {
            return {
              ...item,
              ...action.payload.update,
              textSettings: {
                ...item.textSettings,
                ...action.payload.update.textSettings
              }
            };
          }
        });
      } else {
        items = state.workbenchItems.map(item => {
          if (item.id !== action.payload.id) {
            return item;
          } else {
            return {
              ...item,
              ...action.payload.update
            };
          }
        });
      }

      return { ...state, workbenchItems: items };
    }

    case EditorCurrentActionTypes.REMOVE_WORKBENCH_ITEM: {
      const itemToRemoveId = action.payload;
      // const items = update(state.workbenchItems, { $unset: [itemToRemoveId] });

      return { ...state, workbenchItems: [] };
    }

    default:
      return state;
  }
};

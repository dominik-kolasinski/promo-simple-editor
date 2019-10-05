import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import {
  Action,
  MetaAction,
  PayloadAction,
  TypeConstant
} from "typesafe-actions";
import { editorCurrentReducer } from "./editorCurrent/reducers";
import editorCurrentSaga from "./editorCurrent/sagas";
import { EditorCurrentState } from "./editorCurrent/types";

interface Meta {
  method: string;
  route: string;
}

export interface ApplicationState {
  editorCurrent: EditorCurrentState;
}
export interface MetaAction extends MetaAction<TypeConstant, Meta> {}

export interface ReducerAction<TPayload>
  extends Action<TypeConstant>,
    PayloadAction<TypeConstant, TPayload> {}

export const rootReducer = combineReducers<ApplicationState>({
  editorCurrent: editorCurrentReducer
});

export function* rootSaga() {
  yield all([fork(editorCurrentSaga)]);
}

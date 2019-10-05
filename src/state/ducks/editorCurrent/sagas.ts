import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { MetaAction } from "..";
import apiCaller from "../../utils/apiCaller";
import { fetchBackgroundError, fetchBackgroundSuccess } from "./actions";
import { BackgroundRaw, EditorCurrentActionTypes } from "./types";

function* handleFetch(action: MetaAction): Generator {
  try {
    const res: BackgroundRaw | any = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route
    );

    yield put(fetchBackgroundSuccess(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchBackgroundError(err.stack!));
    } else {
      yield put(fetchBackgroundError("An unknown error occured."));
    }
  }
}

function* watchFetchRequest(): Generator {
  yield takeEvery(EditorCurrentActionTypes.FETCH_BACKGROUND, handleFetch);
}

export default function* editorCurrentSaga() {
  yield all([fork(watchFetchRequest)]);
}

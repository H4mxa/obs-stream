import { StrictEffect, call, put, takeLatest } from "redux-saga/effects";
import { loginActions } from ".";
import { LoginService } from "services/login";
import { navigateTo } from "app/route/utils";
import { loginPayload } from "./types";
import useLocalStorage from "modules/common/hooks/useLocalStorage";
import { STORAGE_KEY } from "modules/common/constants";

interface body {
  email: string;
  password: string;
}

function* watchUserLoginProcess(action: {
  payload: loginPayload["payload"];
}): Generator<StrictEffect, void, any> {
  try {
    const result = yield call(LoginService.doLogin, action.payload);
    if (result && result.status >= 200 && result.status < 300 && result.data) {
      yield put(loginActions.processUserLoginSuccess());

      localStorage.setItem(STORAGE_KEY.TOKEN, result.data.userDetails.token);
      navigateTo("/");
    }
  } catch (error) {
    throw error;
  }
}

export default function* () {
  yield takeLatest<any>(
    loginActions.processUserLogin.type,
    watchUserLoginProcess
  );
}

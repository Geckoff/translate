import { call, put, select } from "redux-saga/effects";
import { clearNetworkErrors, networkError } from "../actions/network";
import { getIsNetworkErrorPresent } from "../reducers";

export default function*(fn, args) {
    try {
        const response = yield call(fn, args);
        if ((typeof response.data === 'string' || response.data instanceof String) && response.data.includes("Translation application API error")) {
            if (!process.env.hasOwnProperty("REACT_APP_BASEURL")) {
                alert(
                    "Error occured! After closing this window you will be redirected to the Lists page"
                );
                window.location = "/lists";
			}
			else {
				console.error(response.data);
			}
        }

        if (yield select(getIsNetworkErrorPresent))
            yield put(clearNetworkErrors());
        return response.data;
    } catch (error) {
        yield put(networkError(error));
        throw error;
    }
}

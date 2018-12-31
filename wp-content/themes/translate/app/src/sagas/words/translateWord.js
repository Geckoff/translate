import {
    translateWordRequest,
    translateWordSuccess,
    translateWordFailure
} from "../../actions/words";
import { takeLatest, call, put } from "redux-saga/effects";
import { translateDictionary } from "../../api/yandexApi";
import { translateTranslator } from "../../api/yandexApi";
import requestFlow from "../request";
import { addMessage } from "../../actions/messages";

export function* translateWordSaga({ payload }) {
    try {
        const {langFrom, langTo} = payload;
        const langFromLangTo = `${langFrom}-${langTo}`;
        let wordData = null;

        if (langFromLangTo !== 'de-es' && langFromLangTo !== 'es-de' ) {
            wordData = yield call(requestFlow, translateDictionary, payload);
        }        
        if ((langFromLangTo === 'de-es' || langFromLangTo === 'es-de') || wordData.def.length < 1) {
            wordData = yield call(requestFlow, translateTranslator, payload);
            if (wordData.text[0] === payload.word) {
                yield put(
                    addMessage({
                        type: "warning",
                        message: "No translation found for this word. You can add your translation."
                    })
                );
                yield put({
					type: translateWordSuccess.toString(),
					payload: {
						word: payload.word,
						translations: []
					}
				});
            } else {
				yield put({
					type: translateWordSuccess.toString(),
					payload: {
						word: payload.word,
						translations: [
							{text: wordData.text[0], pos: ''}
						]
					}
				});	
			}
        } else {
            const normWordData = wordData.def.reduce((prevTrSet, curTrSet) => {
                return [...prevTrSet, ...curTrSet.tr];
            }, []);
            yield put({
                type: translateWordSuccess.toString(),
                payload: {
                    word: payload.word,
                    translations: normWordData
                }
            });
        }
    } catch (error) {
        yield put(translateWordFailure(error));
    }
}

export function* translateWordWatch() {
    yield takeLatest(translateWordRequest, translateWordSaga);
}

import axios from "axios";

const keyDict = 'dict.1.1.20181026T231057Z.2ae7b2159b6e0f44.1b76f2af5640739f6fd89d91834369f1788a54fb';
const keyTrans = 'trnsl.1.1.20181026T211617Z.43ed87828a41aa29.c999292f09c532680a6ec0ca15698b75c408d637';

const instanceDict = axios.create({
    baseURL: 'https://dictionary.yandex.net/api/v1/dicservice.json/'
});

/**
 * Yandex Dictionary api call
 * 
 * @param {string} langFrom - lnguage from which translating
 * @param {string} langTo - lnguage frotom which translating
 * @param {string} word - word to translate
 */
export const translateDictionary = ({langFrom, langTo, word}) => instanceDict(`lookup?key=${keyDict}&lang=${langFrom}-${langTo}&text=${word}`);

const instanceTrans = axios.create({
    baseURL: 'https://translate.yandex.net/api/v1.5/tr.json/'
});

/**
 * Yandex Translator api call
 * 
 * @param {string} langFrom - lnguage from which translating
 * @param {string} langTo - lnguage frotom which translating
 * @param {string} word - word to translate
 */
export const translateTranslator = ({langFrom, langTo, word}) => instanceTrans(`translate?key=${keyTrans}&lang=${langFrom}-${langTo}&text=${word}`);
import axios from "axios";

const key = 'dict.1.1.20181026T231057Z.2ae7b2159b6e0f44.1b76f2af5640739f6fd89d91834369f1788a54fb';

const instance = axios.create({
    baseURL: 'https://dictionary.yandex.net/api/v1/dicservice.json/'
});

export const translate = ({lang, text}) => instance(`lookup?key=${key}&lang=${lang}&text=${text}`)
import {
    addDefaultParameters,
    baseApi
} from "./base.api";

import { SUPPORTED_LANGUAGE } from '../configs/constant';

import {
    ConfigurationObject,
    Language
} from "@types/configurations.type";

const configurationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        configuration: builder.query<ConfigurationObject, void>({
            keepUnusedDataFor: 86400,
            query: () => ({
                url: `/configuration`,
                params: addDefaultParameters({})
            })
        }),
        languages: builder.query<Language[], void>({
            keepUnusedDataFor: 86400,
            query: () => ({
                url: `/configuration/languages`,
                params: addDefaultParameters({})
            }),
            transformResponse: (response: Language[]) => {
                return response.filter((language) => SUPPORTED_LANGUAGE.includes(language.iso_639_1))
            }
        }),
    })
});

export default configurationApi;

export const {
    useConfigurationQuery,
    useLanguagesQuery,
    reducerPath: configurationReducerPath,
    reducer: configurationReducer,
    middleware: configurationMiddleware,
} = configurationApi;
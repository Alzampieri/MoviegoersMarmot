import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

const api_key = '92b418e837b833be308bbfb1fb2aca1e';

export enum TagTypes {}

export type defaultParameters = {
    api_key: typeof api_key
}

export type parameterPlusDefault<T> = defaultParameters & T;

export const baseApi = createApi({
    reducerPath: 'base.api',
    tagTypes: Object.values(TagTypes),
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3'
    }),
    endpoints: () => ({})
});

export function addDefaultParameters<T>(params: T): parameterPlusDefault<T> {
    return {
        ...params,
        api_key: '92b418e837b833be308bbfb1fb2aca1e'
    }
}
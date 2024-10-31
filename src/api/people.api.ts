import {
    addDefaultParameters,
    baseApi,
} from "./base.api";

import {
    BaseApiReturn,
    SearchApiResponse
} from "types/generic.type";
import { People } from "types/contents.type";

export type PeopleParams = {
    language?: string,
    page?: number,
}

export type PeopleCompleteResponse = BaseApiReturn<SearchApiResponse<People>>

const peopleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        people: builder.query<PeopleCompleteResponse, PeopleParams>({
            query: ({ language, page }) => ({
                url: `/person/popular`,
                params: addDefaultParameters<PeopleParams>({
                    language,
                    page
                })
            })
        })
    })
});

export default peopleApi;

export const {
    usePeopleQuery,
    reducerPath: peopleReducerPath,
    reducer: peopleReducer,
    middleware: peopleMiddleware,
} = peopleApi;
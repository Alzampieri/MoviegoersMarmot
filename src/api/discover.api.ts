import {
    addDefaultParameters,
    baseApi
} from "./base.api";

import {
    BaseApiReturn,
    SearchApiResponse
} from "types/generic.type";
import {
    ContentType,
    Movie,
    TvShows
} from "types/contents.type";

export type DiscoverParams = {
    sort_by?: string,
    language?: string,
    page?: number,
    type?: ContentType
}

export type TvShowsDiscoverResponse = BaseApiReturn<SearchApiResponse<TvShows>>
export type MovieDiscoverResponse = BaseApiReturn<SearchApiResponse<Movie>>

const discoverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        discover: builder.query<TvShowsDiscoverResponse, DiscoverParams>({
            query: ({ sort_by, language, type, page }) => ({
                url: `/discover/${type}`,
                params: addDefaultParameters<DiscoverParams>({
                    sort_by,
                    language,
                    page
                })
            })
        })
    })
});

export default discoverApi;

export const {
    useDiscoverQuery,
    reducerPath: discoverReducerPath,
    reducer: discoverReducer,
    middleware: discoverMiddleware,
} = discoverApi;
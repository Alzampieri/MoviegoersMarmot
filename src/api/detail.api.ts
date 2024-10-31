import {
    addDefaultParameters,
    baseApi,
} from "./base.api";

import {
    BaseApiReturn,
    SearchApiResponse
} from "types/generic.type";
import {
    ContentType,
    GenericDetail
} from "types/contents.type";

export type DetailQueryParam = {
    language?: string,
    id: number,
    type: ContentType
}

export type DetailParam = Pick<DetailQueryParam, "language">

export type DetailQueryResponse = BaseApiReturn<GenericDetail>
export type SimilarQueryResponse = BaseApiReturn<SearchApiResponse<GenericDetail>>

type HasPage = {
    page: number
}

export type SimilarQueryParam = DetailQueryParam & HasPage;
export type SimilarParam = DetailParam & HasPage;

const detailApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        detail: builder.query<DetailQueryResponse, DetailQueryParam>({
            query: ({ language, id, type}) => ({
                url: `/${type}/${id}`,
                params: addDefaultParameters<DetailParam>({
                    language
                })
            })
        }),
        similar: builder.query<SimilarQueryResponse, SimilarQueryParam>({
            query: ({ language, id, type, page}) => ({
                url: `/${type}/${id}/similar`,
                params: addDefaultParameters<SimilarParam>({
                    language,
                    page
                })
            })
        })
    })
});

export default detailApi;

export const {
    useDetailQuery,
    useSimilarQuery,
    reducerPath: detailReducerPath,
    reducer: detailReducer,
    middleware: detailMiddleware,
} = detailApi;
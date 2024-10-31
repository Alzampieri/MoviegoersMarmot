export type BaseApiReturn<T> = {
    data: T,
    isLoading: boolean,
}

export type ResultsReturn<T> = {
    results: T
}

export type SearchApiResponse<T> = {
    page: number,
    results: Array<T>,
    total_pages: number,
    total_results: number
}
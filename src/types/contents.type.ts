export interface Content {
    id: number
    overview: string,
    poster_path?: string
    backdrop_path?: string
    profile_path?: string
}

export type WatchableType = 'tv' | 'movie'
export type ContentType = WatchableType | 'person'

export interface itemWithImage {
    image: string;
}

export type withImage<T> = T & itemWithImage;
export type ContentWithImage = withImage<Content>;

export interface Movie extends Content {
    title: string,
    vote_average: number
    production_companies: Array<ProductionCompany>
    genres: Array<Genre>
};
export type MovieWithImage = withImage<Movie>;

export interface TvShows extends Content {
    name: string,
    vote_average: number
    production_companies: Array<ProductionCompany>
    genres: Array<Genre>
};
export type TvShowsWithImage = withImage<TvShows>;

export interface People extends Content {
    name: string,
};
export type PeopleWithImage = withImage<People>;

export type GenericContent = Movie | TvShows | People | Content;
export type GenericContentWithImage = withImage<GenericContent>;

export type GenericDetail = Movie | TvShows
export type GenericDetailWithImage = withImage<GenericDetail>

export type Genre = {
    id: number
    name: string
}

export type ProductionCompany = {
    id: number
    name: string
}

export const isContentWithImage = (item: Content | ContentWithImage): item is ContentWithImage  => {
    return item ? "image" in item : false
}

export const isGenericContentWithImage = (item: GenericContent | GenericContentWithImage): item is GenericContentWithImage  => {
    return item ? "image" in item : false
}

export const isGenericContentWithProductionCompany = (item: GenericContentWithImage | GenericContent): item is MovieWithImage | Movie => {
    return item ? "production_companies" in item : false
}


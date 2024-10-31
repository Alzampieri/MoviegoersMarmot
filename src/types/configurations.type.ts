import { BaseApiReturn } from "./generic.type"

export type Configurations = BaseApiReturn<ConfigurationObject>

export type ConfigurationObject = {
    images: ConfigurationImages
}

export type ConfigurationImages = {
    backdrop_sizes: string[]
    base_url: string
    logo_sizes: string[]
    poster_sizes: string[]
    profile_sizes: string[]
    secure_base_url: string
    still_sizes: string[]
}

export type Language = {
    english_name: string,
    iso_639_1: string,
    name: string,
}
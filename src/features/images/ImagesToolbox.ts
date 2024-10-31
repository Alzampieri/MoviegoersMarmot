import { useConfigurationQuery } from '@api/configuration.api';

import { ConfigurationImages } from '../../types/configurations.type';

import {
  Content,
  ContentWithImage,
  GenericContent,
  GenericContentWithImage,
  withImage
} from '../../types/contents.type';

export type ImagesTypes = 'backdrop' | 'logo' | 'poster' | 'profile' | 'still'
export type KeyOfContent = keyof Content

const generateBaseImageUriFromTypeAndFormat = (conf: ConfigurationImages, type: ImagesTypes, format: string): string => {
  const keyToCheck = `${type}_sizes` as const
  let imageFormat = format

  if (!conf[keyToCheck].includes(format)) {
    imageFormat = 'original'
  }

  return `${conf.base_url}/${imageFormat}` 
}

const addImageUrlPropertyToContents = (
  contents: Array<Content>,
  keyToUri: KeyOfContent,
  basePath: ReturnType<typeof generateBaseImageUriFromTypeAndFormat>
): Array<ContentWithImage | Content> => {
  return contents.reduce((acc: Array<ContentWithImage | Content>, content) => {
    if (!content[keyToUri]) {
      return acc
    }

    return [
      ...acc,
      addImageUrlPropertyToContent(content, keyToUri, basePath)
    ]
  }, [])
}

const addImageUrlPropertyToContent = <T extends Content>(
  content: T,
  keyToUri: KeyOfContent,
  basePath: ReturnType<typeof generateBaseImageUriFromTypeAndFormat>
): T | withImage<T> => {

  if (!content[keyToUri]) {
    return content;
  }

  return {
    ...content,
    image: `${basePath}/${content[keyToUri]}`
  }
}

const useInnerAddCompleteUrlToContent = <T, K>(
  contents: T,
  keyToUri: KeyOfContent,
  type: ImagesTypes,
  format: string,
  formater: (
    contents: T,
    keyToUri: KeyOfContent,
    basePath: ReturnType<typeof generateBaseImageUriFromTypeAndFormat>
  ) => T | K
) : T | K => {

  
  const { data } = useConfigurationQuery()

  const images = data?.images
  
  if (!images || !contents) {
    return contents
  }

  const baseUri = generateBaseImageUriFromTypeAndFormat(images, type, format);

  return formater(contents, keyToUri, baseUri)
}

export const useAddCompleteUrlToContents = (
  contents: Array<GenericContent>,
  keyToUri: KeyOfContent,
  type: ImagesTypes,
  format: string
) : Array<GenericContent | GenericContentWithImage> => {

  return useInnerAddCompleteUrlToContent<Array<GenericContent>, Array<GenericContent | GenericContentWithImage>>(
    contents,
    keyToUri,
    type,
    format,
    addImageUrlPropertyToContents
  )
}

export const useAddCompleteUrlToContent = <T extends GenericContent>(
  content: T,
  keyToUri: KeyOfContent,
  type: ImagesTypes,
  format: string
) : T | withImage<T> => {
  
  return useInnerAddCompleteUrlToContent<T, T | withImage<T>>(
    content,
    keyToUri,
    type,
    format,
    addImageUrlPropertyToContent
  )
}
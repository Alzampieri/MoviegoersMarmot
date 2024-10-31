
import { useSelector } from 'react-redux'

import {
  MovieDiscoverResponse,
  TvShowsDiscoverResponse,
  useDiscoverQuery }
from '@api/discover.api'

import {
  PeopleCompleteResponse,
  usePeopleQuery
} from '@api/people.api'

import { Content } from 'types/contents.type'

import Slider from '@components/Slider'
import Draggable from '@components/draggable/Draggable'
import PeopleItem from '@components/content/PeopleItem'

import { ImagesTypes } from '@features/images/ImagesToolbox'
import { selectLanguage } from '@features/configs/configuration.slice'

import styles from './Home.module.less'

function Home() {
  const language = useSelector(selectLanguage)

  const { data: dataTv } = useDiscoverQuery<TvShowsDiscoverResponse>({
    language,
    type: 'tv'
  })

  const { data: dataMovie } = useDiscoverQuery<MovieDiscoverResponse>({
    language,
    type: 'movie'
  })

  const { data: dataPeople } = usePeopleQuery<PeopleCompleteResponse>({
    language,
  })

  const discoveryTvResults = dataTv?.results ?? [];
  const discoveryMovieResults = dataMovie?.results ?? [];
  const dataPeopleResults = dataPeople?.results ?? [];

  const movieAndTvPictureData = {
    path: 'poster_path' as keyof Content,
    type: 'poster' as ImagesTypes,
    width: 'w154'
  }

  const peoplePictureData = {
    path: 'profile_path' as keyof Content,
    type: 'profile' as ImagesTypes,
    width: 'w185'
  }

  return (
    <Draggable rootClass={styles.draggable} vertical={true}>
      <div className={styles.home}>
        <Slider title='Tv' itemType='tv' link={`/category/tv`} items={discoveryTvResults} pictureData={movieAndTvPictureData}/>
        <Slider title='Movie' itemType='movie' link={`/category/movie`} items={discoveryMovieResults} pictureData={movieAndTvPictureData}/>
        <Slider title='People' itemType='person' link={`/category/people`} items={dataPeopleResults} pictureData={peoplePictureData} ChildElement={PeopleItem}/>
      </div>
    </Draggable>
  )
}

export default Home

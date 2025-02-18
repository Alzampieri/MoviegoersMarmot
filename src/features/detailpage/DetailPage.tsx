
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

import {
  DetailQueryResponse,
  SimilarQueryResponse,
  useDetailQuery,
  useSimilarQuery
} from '@api/detail.api'

import {
  ImagesTypes,
  useAddCompleteUrlToContent
} from '@features/images/ImagesToolbox'
import { selectLanguage } from '@features/configs/configuration.slice'

import {
  Content,
  isGenericContentWithImage,
  isGenericContentWithProductionCompany,
  WatchableType
} from '../../types/contents.type'

import Slider from '@components/Slider'

import styles from './DetailPage.module.less'

interface DetailPageParam {
  watchableType?: WatchableType
  watchableId?: number
}

function DetailPage() {
  const { watchableType = 'movie', watchableId = 0 } = useParams() as DetailPageParam;
  const language = useSelector(selectLanguage)

  const { data: dataDetail, isLoading } = useDetailQuery<DetailQueryResponse>({
    language,
    id: watchableId,
    type: watchableType,
  })

  const { data: dataSimilar } = useSimilarQuery<SimilarQueryResponse>({
    language,
    id: watchableId,
    type: watchableType,
    page: 1
  });

  const dataSimilarResults = dataSimilar?.results ?? [];

  const mutatedItem = useAddCompleteUrlToContent(dataDetail, 'backdrop_path', 'backdrop', 'w1280')

  const movieAndTvPictureData = {
    path: 'poster_path' as keyof Content,
    type: 'poster' as ImagesTypes,
    width: 'w154'
  }

  return(
    <>
      {
        !!mutatedItem &&
        <div className={styles.detailPage}>
          {
            isGenericContentWithImage(mutatedItem) && <>
              <img className={styles.detailPageBackground} src={mutatedItem?.image}/>
              <div className={styles.detailPageBackground}/>
            </>
          }

          <div className={styles.detailPageContent}>
            <div className={styles.detailPageTextWrapper}>
              <div className={styles.detailPageText}>
                <p className={styles.detailPageTitle}>{ (mutatedItem.name ?? mutatedItem.title) ?? "" }</p>
                <p className={styles.detailPageDesc}>{ mutatedItem.overview }</p>
                <div className={styles.detailPageData}>
                  <div className={styles.detailPageDatum}>
                    <div className={styles.detailPageDataTitle}>Note</div>
                    <div>{ `${mutatedItem.vote_average}/10`}</div>
                  </div>
                  <div className={styles.detailPageDatum}>
                    <div className={styles.detailPageDataTitle}>Genre</div>
                    <div>{ mutatedItem.genres.map((genre) => genre.name).join(', ') }</div>
                  </div>
                  {
                    isGenericContentWithProductionCompany(mutatedItem) && mutatedItem.production_companies &&
                    <div className={styles.detailPageDatum}>
                      <div className={styles.detailPageDataTitle}>Production</div>
                      <div className={styles.detailPageDataProduction}>{ mutatedItem.production_companies.map((company) => company.name).join(', ') }</div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <Slider title='Suggestions' itemType={watchableType} link={`/category/${watchableType}`} items={dataSimilarResults} pictureData={movieAndTvPictureData}/>
          </div>
        </div>
      }
    </>
  
  );
}

export default DetailPage

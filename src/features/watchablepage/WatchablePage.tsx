import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import {
  TvShowsDiscoverResponse,
  useDiscoverQuery
} from '@api/discover.api'

import { useAddCompleteUrlToContents } from '@features/images/ImagesToolbox'

import { selectLanguage } from '@features/configs/configuration.slice'

import { Content, ContentType, ContentWithImage } from '@types/contents.type'

import Draggable from '@components/draggable/Draggable'

import styles from './WatchablePage.module.less'

interface WatchablePageParameters {
  category?: ContentType
}

function WatchablePage() {
  const [page, setPage] = useState(1)
  const [toDisplay, setToDisplay]= useState<Array<Content|ContentWithImage>>([])
  const paginating = useRef(false)

  const language = useSelector(selectLanguage)
  let { category } = useParams() as WatchablePageParameters;

  const { data: dataWatchable, isLoading } = useDiscoverQuery<TvShowsDiscoverResponse>({
    language,
    type: category,
    page,
  })

  // triggered by change of Language, clean everything and start again.
  useEffect(() => {
    if (paginating.current) {
      return;
    }

    paginating.current = true;

    setToDisplay([])

    paginating.current = false;

    setPage(1)
  }, [language, category])

  // used by Draggable child to signal to pull more data
  const onPaginationEvent = useCallback((event: React.ChangeEvent<HTMLSelectElement>)=> {
    if (isLoading || paginating.current) {
      return;
    }

    paginating.current = true
    
    setPage(page + 1)
  }, [page, isLoading])

  // triggered by new data from query
  useEffect(() => {
    const dataWatchableResults = dataWatchable?.results ?? [];
    setToDisplay((prevState) => {
      return [
        ...prevState,
        ...dataWatchableResults
      ]
    }) 
  }, [dataWatchable])

  // triggered by change in items to display
  useEffect(() => {
    paginating.current = false;
  }, [toDisplay])


  const mutatedItem = useAddCompleteUrlToContents(toDisplay, 'poster_path', 'poster', 'w154')

  return (
    <Draggable rootClass={styles.watchablePage} vertical={true} paginationEvent={onPaginationEvent} childrenHeight={231} isLoading={isLoading}>
      <div className={styles.watchablePageContent}>
          {
            mutatedItem.map((item: any) => (
              <div className={styles.watchablePageItem} key={item.id}>
                <img draggable={false} src={item.image} />
              </div>
            ))
          }
        </div>
    </Draggable>
  )
}

export default WatchablePage

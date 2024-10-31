
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useSelector } from 'react-redux'

import {
  PeopleCompleteResponse,
  usePeopleQuery
} from '@api/people.api'

import { useAddCompleteUrlToContents } from '@features/images/ImagesToolbox'
import { selectLanguage } from '@features/configs/configuration.slice'

import {
  Content,
  ContentWithImage
} from '@types/contents.type'

import Draggable from '@components/draggable/Draggable'
import PeopleItem from '@components/content/PeopleItem'

import styles from './PeoplePage.module.less'

function PeoplePage() {
  const [page, setPage] = useState(1)
  const [toDisplay, setToDisplay]= useState<Array<Content|ContentWithImage>>([])
  const paginating = useRef(false)

  const language = useSelector(selectLanguage)

  const { data: dataPeople, isLoading } = usePeopleQuery<PeopleCompleteResponse>({
    language,
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
    }, [language])

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
    const dataPeopleResults = dataPeople?.results ?? [];
    setToDisplay((prevState) => {
      return [
        ...prevState,
        ...dataPeopleResults
      ]
    }) 
  }, [dataPeople])

  // triggered by change in items to display
  useEffect(() => {
    paginating.current = false;
    return;
  }, [toDisplay])

  const mutatedItem = useAddCompleteUrlToContents(toDisplay, 'profile_path', 'profile', 'w185');

  return (
    <Draggable rootClass={styles.people} vertical={true} paginationEvent={onPaginationEvent} childrenHeight={231} isLoading={isLoading}>
      <div className={styles.peopleContent}>
          {
            mutatedItem.map((item: any, index) => (
              <PeopleItem className={styles.peopleItem} item={item} key={`${item.id}_${index}`}></PeopleItem>
            ))
          }
        </div>
    </Draggable>
  )
}

export default PeoplePage

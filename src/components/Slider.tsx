
import { Link } from 'react-router-dom'

import {
  ImagesTypes,
  useAddCompleteUrlToContents
} from '@features/images/ImagesToolbox'

import {
  Content,
  ContentType,
  GenericContent,
  GenericContentWithImage,
  isContentWithImage
} from '../types/contents.type';

import Draggable from '@components/draggable/Draggable'
import Watchable, { WatchableProps } from '@components/content/Watchable'

import styles from './Slider.module.less'

interface SliderProps {
  items: GenericContent[],
  itemType: ContentType,
  title: string,
  draggable?: boolean,
  link: string,
  // tried something like that, without success : 
  // export interface ChildElementProps {
  //  item: GenericContentWithImage,
  //  className: string,
  //}
  // ChildElement?: React.FC<ChildElementProps> ,
  ChildElement?: any,
  pictureData: {
    path: keyof Content,
    type: ImagesTypes,
    width: string 
  }
}

function Slider({
  items,
  itemType,
  title,
  draggable,
  link,
  ChildElement = Watchable,
  pictureData: {
    path,
    type,
    width
} }: SliderProps) {
  const mutatedItem = useAddCompleteUrlToContents(
    items,
    path,
    type,
    width,
  )

  const toDisplay = mutatedItem.filter((item) => {
    return isContentWithImage(item);
  })

  return (
    <div className={styles.sliderWrapper} draggable={draggable} >
      <Link to={link} >
        <div className={styles.sliderTitleWrapper}>
          <div className={styles.sliderTitle}>{title}</div>
        </div>
      </Link>

      <Draggable rootClass={styles.draggable} horizontal={true}>
        <div className={styles.sliderContent}>
          {
            toDisplay.map((item: GenericContentWithImage) => (
              <ChildElement className={styles.sliderItem} item={item} itemType={itemType} key={item.id}></ChildElement>
            ))
          }
        </div>
      </Draggable>
    </div>
  )
}

export default Slider

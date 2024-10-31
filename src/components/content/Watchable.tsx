import { Link } from 'react-router-dom'
import {
  ContentType,
  MovieWithImage,
  TvShowsWithImage
} from '@types/contents.type'

export interface WatchableProps {
  item: MovieWithImage | TvShowsWithImage,
  className: string,
  itemType: ContentType
}

function Watchable({ item, className, itemType }: WatchableProps) {
  return (
    <Link className={className} draggable={false} to={`/${itemType}/${item.id}`}>
      <img draggable={false} src={item.image} />
    </Link>
  )
}

export default Watchable

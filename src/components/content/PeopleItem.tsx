import { PeopleWithImage } from '@types/contents.type'

export interface PeopleItemProps {
  item: PeopleWithImage,
  className: string,
}

function PeopleItem({ item, className }: PeopleItemProps) {
  return (
    <div className={className} draggable={false}>
      <img draggable={false} src={item.image} />
    </div>
  )
}

export default PeopleItem

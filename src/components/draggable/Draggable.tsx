import {
  useRef,
  useState,
  ReactNode,
  useEffect
} from 'react'

type DraggableProps = {
  rootClass: string;
  children: ReactNode;
  vertical?: boolean;
  horizontal?: boolean;
  paginationEvent?: Function;
  childrenHeight?: number;
  isLoading?: boolean;
};

function Draggable({rootClass = "", children, vertical, horizontal, paginationEvent = () => {}, childrenHeight = 0, isLoading = false }: DraggableProps) {
  const ourRef = useRef<any>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseCoords = useRef({
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
  });

  const getSlider = () => {
    return ourRef?.current?.children?.[0]
  }

  const checkForPagination = () => {
    const slider = getSlider();

    if (!slider) {
      return;
    }

    const positionFromBottom = slider.scrollHeight - slider.clientHeight - slider.scrollTop;

    if (2*childrenHeight > positionFromBottom) {
      paginationEvent();
    }
  }

  const handleDragStart = (e: React.MouseEvent) => {
      if (!ourRef.current) return

      let toSet = {
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0
      }

      const slider = getSlider();

      if (horizontal) {
        const startX = e.pageX - slider.offsetLeft;
        const scrollLeft = slider.scrollLeft;

        toSet = {
          ...toSet,
          startX,
          scrollLeft
        }
      }    

      if (vertical) {
        const startY = e.pageY - slider.offsetTop;
        const scrollTop = slider.scrollTop;

        toSet = {
          ...toSet,
          startY,
          scrollTop
        }
      }

      mouseCoords.current = toSet
      setIsMouseDown(true)
      document.body.style.cursor = "grabbing"
  }

  const handleDragEnd = () => {
      setIsMouseDown(false)
      if (!ourRef.current) return
      document.body.style.cursor = "default"
  }

  const handleDrag = (e: React.MouseEvent) => {                                                                                                                                                                 
    if (!isMouseDown || ! ourRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const slider = getSlider();

    if (horizontal) {
      const x = e.pageX - slider.offsetLeft;
      const walkX = (x - mouseCoords.current.startX) * 1.5;
      slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    }

    if (vertical) {
      const y = e.pageY - slider.offsetTop;
      const walkY = (y - mouseCoords.current.startY) * 1.5;
      slider.scrollTop = mouseCoords.current.scrollTop - walkY;
    }

    checkForPagination();
  }

  useEffect(() => {
    checkForPagination()
  }, [isLoading])

  return (
    <div 
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
      onMouseLeave={handleDragEnd}
      className={rootClass}>
      {children}
    </div>
  );
}

export default Draggable

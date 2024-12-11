import clsx from 'clsx'
import { useCallback, useRef } from 'react'
import noImage from '~/assets/no-image.png'

function ImageMagnifier({
  src,
  alt = '',
  width = '100%',
  height = '100%',
  mirrorSize = '300px',
  zoomLevel = 3
}) {
  const imgRef = useRef()
  const mirrorRef = useRef()

  const handleImgMouseMove = useCallback((e) => {
    const mouseX = e.clientX // compare to viewport
    const mouseY = e.clientY // compare to viewport
    const {
      x: imgX,
      y: imgY,
      width: imgWidth,
      height: imgHeight
    } = imgRef.current.getBoundingClientRect() // compare to viewport

    const mouseToImgDistanceX = mouseX - imgX
    const mouseToImgDistanceY = mouseY - imgY
    const mouseToImgRatioX = mouseToImgDistanceX / imgWidth * 100
    const mouseToImgRatioY = mouseToImgDistanceY / imgHeight * 100

    mirrorRef.current.style.top = `${mouseY}px`
    mirrorRef.current.style.left = `${mouseX}px`
    mirrorRef.current.style.backgroundPosition = `${mouseToImgRatioX}% ${mouseToImgRatioY}%`
    mirrorRef.current.style.backgroundSize = `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`
  }, [zoomLevel])

  return (
    <div className={`group relative w-[${width}] h-[${height}]`}>
      <img
        ref={imgRef}
        src={src || noImage}
        alt={alt}
        className={clsx(
          'w-full h-full object-cover',
          {
            'cursor-none': src
          }
        )}
        onMouseMove={handleImgMouseMove}
      />
      <div
        ref={mirrorRef}
        style={{
          backgroundImage: `url(${src})`
        }}
        className={clsx(
          `hidden fixed -translate-x-1/2 -translate-y-1/2 z-[1000]
        pointer-events-none w-[${mirrorSize}] h-[${mirrorSize}] rounded-full shadow-card-md`,
          {
            'group-hover:block': src
          }
        )}
      >
      </div>
    </div>
  )
}

export default ImageMagnifier

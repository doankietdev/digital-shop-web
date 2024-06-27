import { useEffect } from 'react'

function useOutsideClick(ref, onOutSide = () => {}) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!ref.current?.contains(event.target)) {
        onOutSide()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onOutSide, ref])
}

export default useOutsideClick

/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useOutsideClick } from '~/hooks'
import { removeDiacritics } from '~/utils/formatter'
import { errorMessageClasses } from '../classes'

function SelectorOutlined(
  {
    label,
    items,
    defaultId,
    disabled = false,
    errorMessage,
    onSelect = () => {}
  },
  ref
) {
  const [focus, setFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    if (defaultId) {
      setSelectedItem(items.find((item) => item.id === defaultId))
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [defaultId, items.length])

  useImperativeHandle(ref, () => ({
    reset() {
      setInputValue('')
      setSelectedItem(null)
    }
  }))

  const handleContainerClick = useCallback(() => {
    if (!focus && !disabled) {
      setFocus(true)
    }
  }, [disabled, focus])

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [])

  const handleInputMouseDown = useCallback(
    (e) => {
      if (disabled) {
        e.preventDefault()
      }
    },
    [disabled]
  )

  const handleSelectItem = useCallback(
    (item) => {
      if (selectedItem?.id !== item.id) {
        setSelectedItem(item)
        onSelect(item?.id)
        setInputValue('')
        setFocus(false)
      }
    },
    [onSelect, selectedItem?.id]
  )

  useOutsideClick(containerRef, () => {
    if (!selectedItem && inputValue) {
      setInputValue('')
    }
    setFocus(false)
  })

  return (
    <div
      className="relative w-full"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <label className="text-[12px] absolute -top-[9px] left-[10px] bg-white text-black/50 px-[3px]">
        {label}
      </label>
      <input
        type="text"
        className={clsx(
          'text-[14px] w-full h-[40px] p-[10px] focus:outline-none bg-transparent border rounded-md bg-white transition-all duration-300',
          {
            'cursor-not-allowed': disabled,
            'border-black': focus,
            'border-black/40': !focus
          }
        )}
        value={selectedItem && !focus ? selectedItem.name : inputValue}
        placeholder={selectedItem?.name}
        onChange={handleInputChange}
        onMouseDown={handleInputMouseDown}
      />
      {errorMessage && (
        <span className={errorMessageClasses()}>{errorMessage}</span>
      )}
      <ul
        className={clsx(
          'absolute z-10 rounded-md mt-2 overflow-y-auto transition-all duration-100 bg-white',
          {
            'max-h-[240px] border': focus,
            'max-h-0': !focus
          }
        )}
      >
        {items
          ?.filter((item) =>
            removeDiacritics(item.name)
              .toLowerCase()
              .includes(removeDiacritics(inputValue).toLowerCase())
          )
          ?.map((item) => (
            <li
              key={item.id}
              className={clsx(
                'text-[14px] p-[10px] hover:bg-black/5 cursor-pointer select-none',
                {
                  'text-primary-400': item.id === selectedItem?.id
                }
              )}
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default memo(forwardRef(SelectorOutlined))

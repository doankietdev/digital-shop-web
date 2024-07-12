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
import { ErrorWarningIcon } from '~/utils/icons'
import Loading from '~/components/Loading'

function SelectorOutlined(
  {
    label = '',
    items = [],
    defaultId = '',
    disabled = false,
    errorMessage = '',
    name = '',
    loading = false,
    onChange = () => {},
    onBlur = () => {},
    onSelect = () => {}
  },
  ref
) {
  const [focus, setFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const containerRef = useRef()
  const inputRef = useRef()
  const loadingRef = useRef()

  useImperativeHandle(ref, () => ({
    reset() {
      setInputValue('')
      setSelectedItem(null)
    }
  }), [setInputValue, setSelectedItem])

  useEffect(() => {
    if (defaultId) {
      setSelectedItem(items.find((item) => item.id === defaultId))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultId, items.length])

  useEffect(() => {
    loadingRef.current?.resize('25px')
  })

  const handleContainerClick = useCallback(() => {
    if (!focus && !disabled) {
      setFocus(true)
    }
  }, [disabled, focus])

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value)
    onChange(e)
  }, [onChange])

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
      }
      setInputValue('')
      setFocus(false)
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
      <div className={clsx(
        'flex border rounded-md bg-white transition-all duration-300',
        {
          'border-black': focus,
          'border-black/40': !focus
        }
      )}>
        <input
          type="text"
          name={name}
          ref={inputRef}
          className={clsx(
            'p-[10px] text-[14px] w-full h-[40px] focus:outline-none bg-transparent',
            {
              'text-black/50 cursor-default': disabled
            }
          )}
          value={selectedItem && !focus ? selectedItem.name : inputValue}
          placeholder={selectedItem?.name}
          onChange={handleInputChange}
          onBlur={onBlur}
          onMouseDown={handleInputMouseDown}
          autoComplete='off'
        />
        {loading && (
          <div className='pr-[10px] flex justify-center items-center'>
            <Loading ref={loadingRef} />
          </div>
        )}
      </div>
      {errorMessage && (
        <p
          className={clsx(
            errorMessageClasses(),
            'mt-2 px-4 py-2 bg-red-50 rounded-md'
          )}
        >
          <ErrorWarningIcon className='icon mr-[6px]' />
          {errorMessage}
        </p>
      )}
      <ul
        className={clsx(
          'absolute left-0 right-0 z-10 rounded-md mt-2 overflow-y-auto transition-all duration-100 bg-white',
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

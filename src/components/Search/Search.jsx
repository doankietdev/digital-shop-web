import { useCallback, useRef, useState } from 'react'
import { TextFieldWithoutForm } from '../FormControls'
import { FaSearchIcon } from '~/utils/icons'
import clsx from 'clsx'

function Search({ className }) {
  const [focus, setFocus] = useState(false)
  const textFieldRef = useRef(null)

  const handleFocusSearchInput = useCallback(() => {
    setFocus(true)
  }, [])
  const handleBlurSearchInput = useCallback(() => {
    setFocus(false)
  }, [])

  const handleClickSearchIcon = useCallback(() => {
    if (!focus) {
      textFieldRef.current.focus()
      setFocus(true)
    }
  }, [focus])

  return (
    <div
      className={clsx(
        'flex items-center bg-white p-[3px] rounded-full',
        className
      )}
    >
      <div
        className='cursor-pointer w-[40px] h-[34px] px-[10px] rounded-full flex justify-center items-center'
        onClick={handleClickSearchIcon}
      >
        <FaSearchIcon className='icon !text-base text-black' />
      </div>
      <div className='relative flex-1'>
        <TextFieldWithoutForm
          className='px-0'
          placeholder='Search'
          ref={textFieldRef}
          onFocus={handleFocusSearchInput}
          onBlur={handleBlurSearchInput}
        />
        <ul
          className={clsx(
            'absolute top-[calc(100%+16px)] left-0 right-0 bg-white text-black shadow rounded overflow-hidden',
            {
              hidden: !focus
            }
          )}
        >
          <li>
            <a href='#' className='block p-[10px] hover:bg-[#ECECEC]'>
              asdfdsafdsafsadfdsaf
            </a>
          </li>
          <li>
            <a href='#' className='block p-[10px] hover:bg-[#ECECEC]'>
              asdfdsafdsafsadfdsaf
            </a>
          </li>
          <li>
            <a href='#' className='block p-[10px] hover:bg-[#ECECEC]'>
              asdfdsafdsafsadfdsaf
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Search

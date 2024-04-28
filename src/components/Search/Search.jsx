import { useState } from 'react'
import { TextFieldWithoutForm } from '../FormControls'
import { FaSearchIcon } from '~/utils/icons'
import clsx from 'clsx'

function Search({ className }) {
  const [focus, setFocus] = useState(false)

  const handleFocusSearchInput = () => {
    setFocus(true)
  }
  const handleBlurSearchInput = () => {
    setFocus(false)
  }

  return (
    <div className={clsx(
      'flex items-center bg-white p-[3px] rounded',
      className
    )}>
      <div className='relative flex-1'>
        <TextFieldWithoutForm
          placeholder='Search'
          onFocus={handleFocusSearchInput}
          onBlur={handleBlurSearchInput}
        />
        <ul
          className={clsx(
            'absolute top-[calc(100%+16px)] left-0 right-0 bg-white text-black shadow rounded overflow-hidden',
            {
              'hidden': !focus
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
      <button className='bg-primary-400 w-[60px] h-[34px] px-[15px] rounded'>
        <FaSearchIcon className='icon !text-base text-white' />
      </button>
    </div>
  )
}

export default Search

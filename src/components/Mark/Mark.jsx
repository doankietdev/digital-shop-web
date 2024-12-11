/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react'

function Mark({ children }) {
  return (
    <span className="text-[12px] leading-none text-primary-400 border border-primary-400 p-[4px]">
      {children}
    </span>
  )
}

export default memo(Mark)

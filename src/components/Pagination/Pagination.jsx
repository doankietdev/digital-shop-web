/* eslint-disable react-refresh/only-export-components */
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { memo } from 'react'
import ReactPaginate from 'react-paginate'
import { MdArrowBackIosNewIcon, MdArrowForwardIosIcon } from '~/utils/icons'

const variants = {
  hidden: {
    opacity: 0,
    y: 100
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      duration: 1
    }
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number,
  onPageChange: PropTypes.func
}

function Pagination({ totalPages, page, onPageChange }) {
  return (
    <motion.div variants={variants} initial='hidden' animate='visible'>
      <ReactPaginate
        forcePage={page}
        previousLabel={<MdArrowBackIosNewIcon />}
        nextLabel={<MdArrowForwardIosIcon />}
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        containerClassName='flex justify-center items-center gap-2 mt-8'
        previousLinkClassName='w-10 h-10 flex justify-center items-center hover:bg-gray-200 rounded-md'
        nextLinkClassName='w-10 h-10 flex justify-center items-center hover:bg-gray-200 rounded-md'
        pageLinkClassName='w-10 h-10 rounded-md flex justify-center items-center hover:bg-gray-200'
        breakLinkClassName='w-10 h-10 flex justify-center items-center hover:bg-gray-200 rounded-md tracking-[2px]'
        activeLinkClassName='bg-primary-400 hover:bg-primary-200 text-white'
        disabledClassName='border-none'
        disabledLinkClassName='opacity-30 cursor-not-allowed hover:bg-transparent'
      />
    </motion.div>
  )
}

export default memo(Pagination)

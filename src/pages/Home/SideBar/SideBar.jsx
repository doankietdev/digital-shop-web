/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from 'react'
import { FaListUl } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { routesConfig } from '~/config'
import { getCategories } from '~/services/categoryService'
import { parsePlaceHolderUrl } from '~/utils/formatter'

function SideBar() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const result = await getCategories()
        setCategories(result.categories)
      } catch (error) {
        /* empty */
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div
      className="absolute top-0 left-0 right-0 lg:static mb-5 lg:mb-0 lg:col-span-1
        max-h-full overflow-auto no-scrollbar lg:rounded bg-primary-400 lg:bg-transparent
        shadow-card"
    >
      <div
        className="hidden lg:flex lg:gap-2 lg:items-center px-3 py-2 text-sm
          bg-primary-400 text-white font-semibold lg:text-[16px] lg:px-3 lg:py-3"
      >
        <FaListUl size="20px" />
        <span>Categories</span>
      </div>
      <div className="flex lg:block text-[14px] capitalize font-medium text-white lg:text-inherit">
        {loading && new Array(10).fill(0).map((ele, index) => (
          <div key={index} className='w-full px-[10px] py-[8px] lg:px-[20px] lg:py-[15px]'>
            <p className='bg-gray-200 rounded-full animate-pulse w-full h-[20px]'></p>
          </div>
        ))}
        {!loading && categories?.map(category => (
          <Link
            key={category._id}
            to={parsePlaceHolderUrl(routesConfig.productsOfCategory, {
              slug: category.slug
            })}
            className="block w-full px-[10px] py-[8px] lg:px-[20px] lg:py-[15px]
              hover:bg-primary-400 hover:bg-opacity-10"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default memo(SideBar)

/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa6'
import { routesConfig } from '~/config'
import { getCategories } from '~/services/categoryService'
import { useDispatch } from 'react-redux'
import { actions } from '~/AppSlice'
import { parsePlaceHolderUrl } from '~/utils/formatter'

function SideBar() {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(actions.setLoading(true))
        const result = await getCategories()
        setCategories(result.categories)
      } catch (error) {
        /* empty */
      } finally {
        dispatch(actions.setLoading(false))
      }
    }

    fetchCategories()
  }, [dispatch])

  return (
    <div className='relative mb-5 md:mb-0 md:col-span-1 border h-fit max-h-full overflow-auto'>
      <div className='sticky top-0 left-0 right-0 flex gap-2 items-center px-3 py-2 text-sm bg-primary-400 text-white font-semibold lg:text-base lg:px-5 lg:py-3'>
        <FaListUl size='20px' />
        <span>All Categories</span>
      </div>
      <div className='flex md:block text-xs lg:text-[14px] capitalize'>
        {categories?.map((category) => (
          <Link
            key={category._id}
            to={parsePlaceHolderUrl(routesConfig.productsOfCategory, {
              slug: category.slug
            })}
            className='block w-full px-[20px] py-[15px] hover:text-primary-400 '
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default memo(SideBar)

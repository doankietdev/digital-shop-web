/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa6'
import { routesConfig } from '~/config'
import { getCategories } from '~/services/categoriesServices'
import { useDispatch } from 'react-redux'
import { actions } from '~/AppSlice'

function SideBar() {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(actions.setLoading(true))
        const result = await getCategories()
        setCategories(result.categories)
      } catch (error) { /* empty */ } finally {
        dispatch(actions.setLoading(false))
      }
    }

    fetchCategories()
  }, [dispatch])

  return (
    <div className='col-span-3 border h-fit max-h-full overflow-auto'>
      <div className='px-[20px] py-[12px] flex gap-2 items-center bg-main text-white font-semibold'>
        <FaListUl size='20px' />
        <span>All Categories</span>
      </div>
      <div>
        {categories?.map((category) => (
          <Link
            key={category._id}
            to={routesConfig.productsOfCategory(category.slug)}
            className='block w-full px-[20px] py-[15px] text-[14px] hover:text-main capitalize'
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default memo(SideBar)

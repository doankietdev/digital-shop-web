import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { routesConfig } from '~/config'
import { getCategories } from '~/services/categoriesServices'

function SideBar() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories()
      setCategories(result.categories)
    }

    fetchCategories()
  }, [])

  return (
    <div className='col-span-3 border h-fit max-h-full overflow-auto'>
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
  )
}

export default SideBar

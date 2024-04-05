import { useEffect, useState } from 'react'
import { getCategories } from '~/services/categoriesServices'

function SideBar() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategories())
    }
    fetchCategories()
  }, [])
  console.log(categories)

  return <div className='col-span-3'>SideBar</div>
}

export default SideBar

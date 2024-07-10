import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setLoading } from '~/AppSlice'
import { routesConfig } from '~/config'
import { dispatch } from '~/redux'
import { getBrands } from '~/services/brandService'
import { parsePlaceHolderUrl } from '~/utils/formatter'
import brandImage from '~/assets/brand.png'

function Brand() {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchBrands = async () => {
      dispatch(setLoading(true))
      const result = await getBrands()
      setBrands(result.brands)
      dispatch(setLoading(false))
    }

    fetchBrands()
  }, [])

  return (
    <>
      <h2 className='capitalize font-semibold text-[18px] md:text-[20px] border-b-2 border-primary-400 pb-2 lg:pb-4 flex items-center gap-2'>
        <img src={brandImage} className='h-7' />
        Brands
      </h2>
      <ul className='flex flex-wrap gap-4 mt-5'>
        {brands.map((brand) => (
          <li key={brand._id}>
            <Link
              to={parsePlaceHolderUrl(routesConfig.productsOfBrands, {
                slug: brand.slug
              })}
              className='inline-block px-4 py-3 bg-[#e9ebee] font-medium
                rounded-lg hover:bg-black hover:text-white transition-all
                duration-300 ease-in-out'
            >
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Brand

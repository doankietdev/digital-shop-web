/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '~/AppSlice'
import { Product } from '~/components'
import { getProducts } from '~/services/productsServices'

function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(actions.setLoading(true))
        const products =
          (
            await getProducts({
              _limit: 9,
              'averageRatings[gte]': 4
            })
          )?.products || []
        setProducts(products)
      } catch (error) {
        /* empty */
      } finally {
        dispatch(actions.setLoading(false))
      }
    }

    fetchProducts()
  }, [dispatch])

  return (
    <div>
      <h2 className='uppercase font-semibold text-xl border-b-2 border-main pb-[15px]'>
        Featured Products
      </h2>
      <div className='grid grid-cols-3 gap-5 mx-[-10px] mt-5'>
        {products.map((product) => (
          <Product key={product._id} product={product} horizontal />
        ))}
      </div>
    </div>
  )
}

export default memo(FeaturedProducts)

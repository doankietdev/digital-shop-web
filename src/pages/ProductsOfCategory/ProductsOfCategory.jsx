import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { setLoading } from '~/AppSlice'
import {
  NoProductsAvailable,
  Pagination,
  Product,
  ProductSkeleton
} from '~/components'
import { dispatch } from '~/redux'
import { appSelector } from '~/redux/selectors'
import { getCategoryBySlug } from '~/services/categoryService'
import { getProducts } from '~/services/productService'

const LIMIT = 50

function ProductsOfCategory() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get('_page')) || 0,
    limit: LIMIT,
    totalPages: 10
  })
  const [products, setProducts] = useState(null)
  const { slug } = useParams()
  const { loading } = useSelector(appSelector)

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      const foundCategory = await getCategoryBySlug(slug)
      if (!foundCategory) {
        // navigate to page not found
      }

      const result = await getProducts({
        category: foundCategory._id,
        _page: pagination.page,
        _limit: pagination.limit
      })
      setPagination((prev) => ({ ...prev, totalPages: result.totalPages }))
      setProducts(result.products)
      dispatch(setLoading(false))
    }
    fetchProducts()
  }, [pagination.limit, pagination.page, slug])

  const handlePageChange = useCallback(
    async ({ selected }) => {
      setSearchParams({
        _page: selected + 1
      })
      setPagination((prev) => ({
        ...prev,
        page: selected + 1
      }))
      window.scrollTo({ top: 0 })
    },
    [setSearchParams]
  )

  return (
    <>
      <section>
        <div className='container'>
          <div
            className={clsx({
              'grid grid-cols-5 gap-5': products === null || products.length
            })}
          >
            {loading ? (
              <>
                {new Array(LIMIT).fill(0).map((value, index) => (
                  <ProductSkeleton key={index} className='!mx-0' />
                ))}
              </>
            ) : products === null ? (
              ''
            ) : products.length ? (
              products?.map((product) => (
                <Product
                  key={product?._id}
                  product={product}
                  showLabel
                  autoLabel
                  className='!mx-0'
                />
              ))
            ) : (
              <NoProductsAvailable />
            )}
          </div>
          {products?.length && (
            <div className='mt-5'>
              <Pagination
                totalPages={pagination.totalPages}
                page={pagination.page - 1}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default ProductsOfCategory

import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { setLoading } from '~/AppSlice'
import {
  Filter,
  NoProductsAvailable,
  Pagination,
  Product,
  ProductSkeleton,
  RangeSlider,
  Sort
} from '~/components'
import { dispatch } from '~/redux'
import { appSelector } from '~/redux/selectors'
import { getBrands } from '~/services/brandService'
import { getCategoryBySlug } from '~/services/categoryService'
import { getProducts } from '~/services/productService'
import { BuyIcon, SortAscIcon, SortDescIcon } from '~/utils/icons'

const LIMIT = 50
const MIN_PRICE_FILTER = 0
const MAX_PRICE_FILTER = 100000000
const ramCapacityFilter = [
  { value: 4, name: '4GB' },
  { value: 8, name: '8GB' },
  { value: 16, name: '16GB' },
  { value: 32, name: '32GB' },
  { value: 64, name: '64GB' }
]

function ProductsOfCategory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get('_page')) || 1,
    limit: LIMIT,
    totalPages: 10
  })
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState(null)
  const [filter, setFilter] = useState(() => {
    // price
    const priceFilerArray = searchParams.get('price')?.split('-')
    let price = {}
    if (priceFilerArray) {
      let gtePrice = priceFilerArray[0]
      let ltePrice = priceFilerArray[1]
      if ((!gtePrice || !ltePrice) && gtePrice > ltePrice) {
        gtePrice = MIN_PRICE_FILTER
        ltePrice = MAX_PRICE_FILTER
      }
      price = {
        gte: gtePrice,
        lte: ltePrice
      }
    } else {
      price = {
        gte: MIN_PRICE_FILTER,
        lte: MAX_PRICE_FILTER
      }
    }

    // brand
    const brand = searchParams.get('brand')?.split(',') || []

    // specs
    const specs = searchParams.get('ram')
      ? [
        {
          k: 'ram',
          v: searchParams
            .get('ram')
            ?.split(',')
            .map((valueItem) => parseInt(valueItem))
        }
      ]
      : []

    return {
      price,
      brand,
      specs
    }
  })
  const [sort, setSort] = useState(() => {
    return searchParams.get('_sort')?.split(',') || []
  })
  const { slug } = useParams()
  const { loading } = useSelector(appSelector)

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))

      const [{ brands }, foundCategory] = await Promise.all([
        await getBrands(),
        await getCategoryBySlug(slug)
      ])
      if (!foundCategory) {
        // navigate to page not found
      }
      setBrands(brands)
      const result = await getProducts({
        category: foundCategory._id,
        _page: pagination.page,
        _limit: pagination.limit,
        ...filter,
        _sort: sort.join(',')
      })
      setPagination((prev) => ({ ...prev, totalPages: result.totalPages }))
      setProducts(result.products)

      dispatch(setLoading(false))
    }
    fetchProducts()
  }, [filter, pagination.limit, pagination.page, slug, sort])

  const handlePageChange = useCallback(
    async ({ selected }) => {
      setSearchParams((prev) => ({
        ...prev,
        _page: selected + 1
      }))
      setPagination((prev) => ({
        ...prev,
        page: selected + 1
      }))
      window.scrollTo({ top: 0 })
    },
    [setSearchParams]
  )

  const handlePriceFilterChange = (values) => {
    setSearchParams((prev) => ({
      ...prev,
      price: `${values[0]}-${values[1]}`
    }))
    setFilter((prev) => ({
      ...prev,
      price: { gte: values[0], lte: values[1] }
    }))
  }

  const handleBrandFilterChange = useCallback(
    (values) => {
      setSearchParams((prev) => ({
        ...prev,
        brand: values.join(',')
      }))
      setFilter((prev) => ({ ...prev, brand: values }))
    },
    [setSearchParams]
  )

  const handleRAMCapacityFilterChange = useCallback(
    (values) => {
      setSearchParams((prev) => ({
        ...prev,
        ram: values.join(',')
      }))

      setFilter((prev) => {
        if (!values.length) {
          prev.specs = prev.specs.filter((specItem) => specItem.k !== 'ram')
          return { ...prev }
        }
        const foundSpecItem = prev.specs.find(
          (specItem) => specItem.k === 'ram'
        )
        if (foundSpecItem) {
          foundSpecItem.v = values
          return { ...prev }
        }
        return {
          ...prev,
          specs: [...prev.specs, { k: 'ram', v: values }]
        }
      })
    },
    [setSearchParams]
  )

  const handleSortChange = useCallback(
    (value) => {
      setSearchParams((prev) => ({ ...prev, _sort: [value].join(',') }))
      setSort([value])
    },
    [setSearchParams]
  )

  return (
    <>
      <section>
        <div className='container'>
          <h2 className='text-[18px] font-semibold capitalize mb-2'>Filter</h2>
          <div className='flex gap-3'>
            <Filter title='Price'>
              <RangeSlider
                min={MIN_PRICE_FILTER}
                max={MAX_PRICE_FILTER}
                defaultValue={[filter.price.gte, filter.price.lte]}
                cash
                onChangeComplete={handlePriceFilterChange}
              />
            </Filter>

            <Filter
              title='Brand'
              items={brands.map((brand) => ({
                value: brand._id,
                name: brand.name
              }))}
              defaultValues={filter.brand}
              onChange={handleBrandFilterChange}
            />

            <Filter
              title='RAM Capacity'
              items={ramCapacityFilter}
              defaultValues={
                filter.specs.find((spec) => spec.k === 'ram')?.v || []
              }
              onChange={handleRAMCapacityFilterChange}
            />
          </div>
        </div>
      </section>

      <section className='mt-5'>
        <div className='container'>
          <h2 className='text-[18px] font-semibold capitalize mb-2'>Sort By</h2>
          <div className='flex gap-3'>
            <Sort
              items={[
                {
                  icon: <SortDescIcon className='text-[16px]' />,
                  name: 'Price: High - Low',
                  value: '-price'
                },
                {
                  icon: <SortAscIcon className='text-[16px]' />,
                  name: 'Price: Low - High',
                  value: 'price'
                },
                {
                  icon: <BuyIcon className='text-[17px]' />,
                  name: 'Many Buy',
                  value: '-sold'
                }
              ]}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </section>

      <section className='mt-5'>
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
          {!!products?.length && (
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

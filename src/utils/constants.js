import { routesConfig } from '~/config'

const NAV_BAR = [
  {
    ID: 1,
    VALUE: 'home',
    PATH: routesConfig.home()
  },
  {
    ID: 2,
    VALUE: 'products',
    PATH: routesConfig.products()
  },
  {
    ID: 3,
    VALUE: 'blogs',
    PATH: routesConfig.blogs()
  },
  {
    ID: 4,
    VALUE: 'our services',
    PATH: routesConfig.service()
  },
  {
    ID: 5,
    VALUE: 'FAQs',
    PATH: routesConfig.faqs()
  }
]

const PRODUCT_CONDITIONS_TO_CHECK = {
  NEW_DISTANCE_DAY: 10,
  SOLD: 100,
  FAVORITE_RATING: 4
}

export { NAV_BAR, PRODUCT_CONDITIONS_TO_CHECK }

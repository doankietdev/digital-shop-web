import { routesConfig } from '~/config'

const NAV_BAR = [
  {
    ID: 1,
    VALUE: 'home',
    PATH: routesConfig.home
  },
  {
    ID: 2,
    VALUE: 'My Orders',
    PATH: routesConfig.myOrders
  },
  {
    ID: 3,
    VALUE: 'Tech News',
    PATH: routesConfig.blogs
  },
  {
    ID: 4,
    VALUE: 'Payment Guide',
    PATH: routesConfig.service
  },
  {
    ID: 5,
    VALUE: 'FAQs',
    PATH: routesConfig.faqs
  }
]

const TIME = {
  MILLISECONDS_1_DAY: 1000 * 60 * 60 * 24,
  MILLISECONDS_1_HOUR: 1000 * 60 * 60,
  MILLISECONDS_1_MINUTE: 1000 * 60,
  MILLISECONDS_1_SECOND: 1000
}

const PRODUCT_CONDITIONS_TO_CHECK = {
  NEW_DISTANCE_DAY: 100,
  SOLD: 100,
  FAVORITE_RATING: 4
}

const CATEGORIES = {
  SMARTPHONE: {
    ID: '662e0e505dc87fceec4e5590',
    SLUG: 'smartphone-1714294352467'
  },
  TABLET: {
    ID: '662e0e505dc87fceec4e5591',
    SLUG: 'tablet-1714294352468'
  },
  LAPTOP: {
    ID: '662e0e505dc87fceec4e5592',
    SLUG: 'laptop-1714294352468'
  }
}

const StorageKeys = {
  ACCESS_TOKEN: 'access_token',
  IS_RESET_PASSWORD_SUCCESS: 'is_reset_password_success'
}

const RequestHeaderKeys = {
  userId: 'x-user-id'
}

export {
  NAV_BAR,
  TIME,
  PRODUCT_CONDITIONS_TO_CHECK,
  CATEGORIES,
  StorageKeys,
  RequestHeaderKeys
}

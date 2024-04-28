import { routesConfig } from '~/config'

const NAV_BAR = [
  {
    ID: 1,
    VALUE: 'home',
    PATH: routesConfig.home
  },
  {
    ID: 2,
    VALUE: 'products',
    PATH: routesConfig.products
  },
  {
    ID: 3,
    VALUE: 'blogs',
    PATH: routesConfig.blogs
  },
  {
    ID: 4,
    VALUE: 'our services',
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
    ID: '662db747bed2a099eef18287',
    SLUG: 'smartphone-1714272071811'
  },
  TABLET: {
    ID: '662db747bed2a099eef18288',
    SLUG: 'tablet-1714272071812'
  },
  LAPTOP: {
    ID: '662db747bed2a099eef18289',
    SLUG: 'laptop-1714272071812'
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

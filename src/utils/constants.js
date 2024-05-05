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
  SOLD: 50,
  FAVORITE_RATING: 4,
  BIG_DISCOUNTS: 200000
}

const CATEGORIES = {
  SMARTPHONE: {
    ID: '662fd94a16690383cc9f6481',
    SLUG: 'smartphone-1714411850886'
  },
  TABLET: {
    ID: '662fd94a16690383cc9f6482',
    SLUG: 'tablet-1714411850887'
  },
  LAPTOP: {
    ID: '662fd94a16690383cc9f6483',
    SLUG: 'laptop-1714411850887'
  },
  TELEVISION: {
    ID: '662fd94a16690383cc9f6488',
    SLUG: 'television-1714411850887'
  },
  ACCESSORY: {
    ID: '662fd94a16690383cc9f6487',
    SLUG: 'accessories-1714411850887'
  }
}

const StorageKeys = {
  ACCESS_TOKEN: 'access_token',
  IS_RESET_PASSWORD_SUCCESS: 'is_reset_password_success',
  SUCCESSFUL_SIGN_UP_MESSAGE: 'successful_sign_up_message'
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

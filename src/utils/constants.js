import { routesConfig } from '~/config'
import enImage from '~/assets/en.png'
import viImage from '~/assets/vi.png'

const NAV_BAR = [
  {
    ID: 1,
    VALUE: 'Home',
    PATH: routesConfig.home
  },
  {
    ID: 2,
    VALUE: 'Orders',
    PATH: routesConfig.orders
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
  FAVORITE_RATING: 4
}

const CATEGORIES = {
  SMARTPHONE: {
    ID: '667283c5322b41490e8f7548',
    SLUG: 'smartphone-1718780869049'
  },
  TABLET: {
    ID: '667283c5322b41490e8f7549',
    SLUG: 'tablet-1718780869050'
  },
  LAPTOP: {
    ID: '667283c5322b41490e8f754a',
    SLUG: 'laptop-1718780869050'
  },
  TELEVISION: {
    ID: '667283c5322b41490e8f754f',
    SLUG: 'television-1718780869050'
  },
  ACCESSORY: {
    ID: '667283c5322b41490e8f754e',
    SLUG: 'accessories-1718780869050'
  }
}

const StorageKeys = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  IS_RESET_PASSWORD_SUCCESS: 'is_reset_password_success',
  SUCCESSFUL_SIGN_UP_MESSAGE: 'successful_sign_up_message'
}

const RequestHeaderKeys = {
  USER_ID: 'x-user-id'
}

const PaymentMethodsEnum = {
  CASH_ON_DELIVERY: {
    name: 'Cash on delivery',
    value: 'CASH_ON_DELIVERY'
  },
  PAY_IN_STORE: {
    name: 'Pay in store',
    value: 'PAY_IN_STORE'
  },
  ONLINE_PAYMENT: {
    name: 'Online payment',
    value: 'ONLINE_PAYMENT'
  }
}

const OrderStatusesEnum = {
  PENDING: {
    name: 'Pending',
    value: 'PENDING'
  },
  PAID: {
    name: 'Paid',
    value: 'PAID'
  },
  CONFIRMED: {
    name: 'Confirmed',
    value: 'CONFIRMED'
  },
  SHIPPING: {
    name: 'Shipping',
    value: 'SHIPPING'
  },
  COMPLETED: {
    name: 'Completed',
    value: 'COMPLETED'
  },
  CANCELED: {
    name: 'Canceled',
    value: 'CANCELED'
  }
}

const languageMap = {
  en: {
    name: 'English',
    flag:  enImage
  },
  vi: {
    name: 'Vietnamese',
    flag: viImage
  }
}

const currencyMap = {
  vi: 'VND',
  en: 'USD'
}

export {
  NAV_BAR,
  TIME,
  PRODUCT_CONDITIONS_TO_CHECK,
  CATEGORIES,
  StorageKeys,
  RequestHeaderKeys,
  PaymentMethodsEnum,
  OrderStatusesEnum,
  languageMap,
  currencyMap
}

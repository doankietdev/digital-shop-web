const routesConfig = {
  home: '/',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  verifyAccount: '/auth/verify-account',
  emailVerificationSuccess: '/auth/email-verification-success',
  emailVerificationError: '/auth/email-verification-error',
  forgotPassword: '/auth/forgot-password',
  verifyPasswordResetOTP: '/auth/verify-password-reset-otp',
  resetPassword: '/auth/reset-password',
  cart: '/cart',
  checkout: '/checkout',
  blogs: '/blogs',
  service: '/service',
  faqs: '/faqs',
  productsOfCategory: '/categories/:slug',
  productDetails: '/products/:slug',
  productsOfBrands: '/brands/:slug',
  orders: '/user/purchase',
  orderDetails: '/user/purchase/orders/:orderId',
  profile: '/user/account/profile',
  security: '/user/account/security',
  addresses: '/user/account/addresses',
  notifications: '/user/notifications',
  pageNotFound: '/404'
}

export default routesConfig

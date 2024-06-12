const routesConfig = {
  home: '/',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  verifyEmail: '/auth/verify-email/:userId/:token',
  emailVerificationSuccess: '/auth/email-verification-success',
  emailVerificationError: '/auth/email-verification-error',
  forgotPassword: '/auth/forgot-password',
  verifyPasswordResetOTP: '/auth/verify-password-reset-otp',
  resetPassword: '/auth/reset-password',
  myOrders: '/orders',
  cart: '/cart',
  checkout: '/checkout',
  blogs: '/blogs',
  service: '/service',
  faqs: '/faqs',
  productsOfCategory: '/categories/:slug',
  productDetails: '/products/:slug',
  productsOfBrands: '/brands/:slug'
}

export default routesConfig

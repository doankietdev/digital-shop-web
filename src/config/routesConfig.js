const routesConfig = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  verifyEmail: '/auth/verify-email/:userId/:token',
  emailVerificationSuccess: '/auth/email-verification-success',
  emailVerificationError: '/auth/email-verification-error',
  forgotPassword: '/auth/forgot-password',
  verifyPasswordResetOTP: '/auth/verify-password-reset-otp',
  resetPassword: '/auth/reset-password',
  myOrders: '/me/orders',
  blogs: '/blogs',
  service: '/service',
  faqs: '/faqs',
  productsOfCategory: '/categories/:slug',
  productDetails: '/products/:slug',
  productsOfBrands: '/brands/:slug'
}

export default routesConfig

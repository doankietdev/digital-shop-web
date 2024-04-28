const routesConfig = {
  home: '/',
  auth: '/auth',
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
  productDetails: '/products/:slug'
}

export default routesConfig

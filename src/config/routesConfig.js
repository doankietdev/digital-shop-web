const routesConfig = {
  home: () => '/',
  auth: () => '/auth',
  verifyEmail: () => '/auth/verify-email/:userId/:token',
  emailVerificationSuccess: () => '/auth/email-verification-success',
  emailVerificationError: () => '/auth/email-verification-error',
  products: () => '/products',
  blogs: () => '/blogs',
  service: () => '/service',
  faqs: () => '/faqs',
  productsOfCategory: (slug) => `/categories/${slug}`,
  productDetails: (slug) => `/products/${slug}`
}

export default routesConfig

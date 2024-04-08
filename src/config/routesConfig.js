const routesConfig = {
  home: () => '/',
  login: () => '/auth/login',
  products: () => '/products',
  blogs: () => '/blogs',
  service: () => '/service',
  faqs: () => '/faqs',
  productsOfCategory: (categorySlug) => `/categories/${categorySlug}`
}

export default routesConfig

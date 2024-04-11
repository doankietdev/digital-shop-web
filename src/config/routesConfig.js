const routesConfig = {
  home: () => '/',
  auth: () => '/auth',
  products: () => '/products',
  blogs: () => '/blogs',
  service: () => '/service',
  faqs: () => '/faqs',
  productsOfCategory: (slug) => `/categories/${slug}`,
  productDetails: (slug) => `/products/${slug}`
}

export default routesConfig

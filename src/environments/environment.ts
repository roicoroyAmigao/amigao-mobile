/* eslint-disable @typescript-eslint/naming-convention */

export const environment = {
  production: false,
  API_BASE_PATH: 'http://localhost:1337/api',
  BASE_PATH: 'http://localhost:1337',
  MEDUSA_API_BASE_PATH: 'http://localhost:9000',
  instrumentationKey: null,
  STRIPE_KEY:'pk_test_2qqvb6DTqKondL46mnEjZ68e',
  firebase: {
    projectId: 'mercadoamigao-frontend',
    appId: '1:780324673146:web:db705b2235d5556477cdc3',
    storageBucket: 'mercadoamigao-frontend.appspot.com',
    apiKey: 'AIzaSyCQJ0Ddh9C-L5ZBKFpFyjPeaLz_deyk614',
    authDomain: 'mercadoamigao-frontend.firebaseapp.com',
    messagingSenderId: '780324673146',
    measurementId: 'G-PT2N07XM92',
  },
  populate: '?populate=*',
  todo: '/todo',
  products: '/products',
  // Post:
  medusa_store_login_customer: 'http://localhost:9000/store/auth/',
  // Post:
  medusa_store_register_customer: 'http://localhost:9000/store/customers',
  // Get
  medusa_store_products: 'http://localhost:9000/store/products',
  medusa_regions: 'http://localhost:9000/store/regions/',
  // Post
  create_medusa_cart: 'http://localhost:9000/store/carts/',
  // Get
  medusa_store: 'http://localhost:9000/admin/store/',
  demo: 'demo1',
  SERVER_URL: 'http://localhost:1337'
};

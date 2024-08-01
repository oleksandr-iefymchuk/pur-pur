type ApiErrors = {
  REQUIRED_NANE: string;
  REQUIRED_TITLE: string;
  REQUIRED_GENRE: string;
  REQUIRED_FIELDS: string;
  NOT_FOUND: string;
  INVALID_DATE: string;
  SERVER_ERROR: string;
};

export const apiErrors: ApiErrors = {
  REQUIRED_NANE: 'Name field is required',
  REQUIRED_TITLE: 'Title field is required',
  REQUIRED_GENRE: 'Genre field is required and should be an array',
  REQUIRED_FIELDS: 'All fields are required',
  INVALID_DATE: 'Invalid release date',
  NOT_FOUND: 'Not found',
  SERVER_ERROR: 'Internal Server Error'
};

type ApiEndpoints = {
  PRODUCTS: string;
  REVIEWS: string;
  USERS: string;
  ORDERS: string;
};

export const apiEndpoints: ApiEndpoints = {
  PRODUCTS: '/products',
  REVIEWS: '/reviews',
  USERS: '/users',
  ORDERS: '/orders'
};

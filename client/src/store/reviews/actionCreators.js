import { GET_REVIEWS, ADD_REVIEW, UPDATE_REVIEW } from './actionTypes';

const getReviwes = review => ({
  type: GET_REVIEWS,
  payload: review
});

const addReview = review => ({
  type: ADD_REVIEW,
  payload: review
});

const updateReview = review => ({
  type: UPDATE_REVIEW,
  payload: review
});

export { getReviwes, addReview, updateReview };

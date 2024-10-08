import {
  GET_REVIEWS,
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW
} from './actionTypes';

const getReviews = review => ({
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

const delReview = id => ({
  type: DELETE_REVIEW,
  payload: id
});

export { getReviews, addReview, updateReview, delReview };

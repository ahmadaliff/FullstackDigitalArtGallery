import { ADD_ART, ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, RESET_CATEGORY, SET_CATEGORY } from './constants';

export const handleSubmitArt = (data, callback) => ({
  type: ADD_ART,
  data,
  callback,
});
export const AddCategoryArt = (data) => ({
  type: ADD_CATEGORY,
  data,
});
export const getCategoryArt = () => ({
  type: GET_CATEGORY,
});
export const setCategoryArt = (category) => ({
  type: SET_CATEGORY,
  category,
});
export const deleteCategoryArt = (id) => ({
  type: DELETE_CATEGORY,
  id,
});
export const resetCategory = () => ({
  type: RESET_CATEGORY,
});

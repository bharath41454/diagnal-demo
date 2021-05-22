import { SEARCH } from "../types/constants";
const initialState = {
  isSearchActive: false,
};
export const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH:
      return {
        ...state,
        isSearchActive: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

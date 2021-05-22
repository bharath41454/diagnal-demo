import { PAGE_DATA, SEARCH_CONTENT } from "../types/constants";
const initialState = {
  title: "",
  totalItems: 0,
  pageNumber: 0,
  pageSize: 0,
  itemSize: 0,
  content: [],
  searchContent: [],
};
export const pageDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PAGE_DATA:
      return {
        ...state,
        ...payload,
        content: [...state.content, ...payload.content],
      };
    case SEARCH_CONTENT:
      return {
        ...state,
        searchContent: [...payload],
      };
    default:
      return { ...state };
  }
};

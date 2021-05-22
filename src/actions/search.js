import { SEARCH, SEARCH_CONTENT } from "../types/constants";

export const searchItem = ({ isSearchActive = false, searchKey }) => {
  return async (dispatch, getState) => {
    const { pageData = {} } = getState();
    const searchContent = pageData.content.filter(
      ({ name }) => name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1
    );
    dispatch({ type: SEARCH, payload: isSearchActive });
    dispatch({ type: SEARCH_CONTENT, payload: searchContent });
  };
};

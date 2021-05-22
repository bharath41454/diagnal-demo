import { combineReducers } from "redux";
import { pageDataReducer } from "./pageData";
import { searchReducer } from "./search";

export const rootReducer = combineReducers({
  pageData: pageDataReducer,
  search: searchReducer,
});

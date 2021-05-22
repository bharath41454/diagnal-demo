import { pageData } from "../config";
import { PAGE_DATA } from "../types/constants";
import { customizeData } from "../utils/common";

export const getPageData = ({ index }) => {
  return async (dispatch) => {
    const url = pageData.replace("<index>", index);
    const data = await fetch(url, { method: "GET" })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    let customData = {};
    if (data) {
      customData = customizeData(data);
    }
    dispatch({ type: PAGE_DATA, payload: customData });
  };
};

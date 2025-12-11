import { contentApi } from "../../api";
import { GET_PAGE_LAYOUT_CONTENT } from "../../query";

export const getPageLayoutContent = async (api = contentApi) => {
  const pageContent = await api(GET_PAGE_LAYOUT_CONTENT);

  return pageContent;
};

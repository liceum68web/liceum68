import { contentApi } from "../../api";
import { GET_PAGE_CONTENT } from "../../query";

/**
 * Fetches page content data for a given slug using the provided API function.
 *
 * @param {string} slug - The unique identifier for the page whose content is to be fetched.
 * @param {Function} [api=contentApi] - Optional API function to use for fetching the content (defaults to contentApi).
 * @returns {Promise<any>} The result of the API call containing the page content data.
 */

export const getPageContent = async (slug: string, api = contentApi) => {
  const pageContent = await api(GET_PAGE_CONTENT, { slug });

  return pageContent;
};

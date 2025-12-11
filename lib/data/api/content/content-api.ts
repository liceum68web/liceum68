import { flow, identity } from "lodash";

import { APIMiddleware, HTTPMethod } from "@/lib/types";
import { iconNameToPascalCase, keysToCamelCase } from "@/lib/utils";

const defaultMiddleware = {
  keysToCamelCase,
  iconNameToPascalCase,
};

/**
 * Calls the Content API with a GraphQL query and parameters, applying optional middleware to transform the response.
 *
 * @param {string} query - The GraphQL query string to send to the Content API.
 * @param {Record<string, string>} params - The variables to use in the GraphQL query.
 * @param {APIMiddleware} [middleware=defaultMiddleware] - Optional middleware for transforming the API response (e.g., key casing).
 * @returns {Promise<{ data: any, error: any }>} An object containing the API response data (transformed) and any error encountered.
 */

export const contentApi = async (
  query: string,
  params?: Record<string, string>,
  middleware: APIMiddleware = defaultMiddleware,
) => {
  const baseUrl = process.env.CONTENT_API_BASE_URL;
  const apiKey = process.env.CONTENT_API_KEY;
  const apiKeyCollectionName = process.env.API_KEY_COLLECTION_NAME;

  let data = null;
  let error = null;

  try {
    if (!baseUrl) {
      throw new Error("Content API base URL is not defined");
    }

    if (!apiKey) {
      throw new Error("Content API key is not defined");
    }

    const response = await fetch(baseUrl, {
      method: HTTPMethod.POST,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${apiKeyCollectionName} API-Key ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        ...(params && { variables: params }),
      }),
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorMessage = `HTTP error ${response.status}`;

      if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        errorMessage += `; ${JSON.stringify(errorData)}`;
      } else {
        const errorText = await response.text();
        errorMessage += `; Non-JSON response: ${errorText.substring(0, 200)}`;
      }

      throw new Error(`Content API error: ${errorMessage}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const responseText = await response.text();
      throw new Error(
        `Content API returned non-JSON response: ${responseText.substring(0, 200)}`,
      );
    }

    const result = await response.json();

    const transformKeys = flow(Object.values(middleware).filter(Boolean));

    data = transformKeys(result.data);
  } catch (err) {
    console.error(`Content API error: ${err}`);
    error = err;
  }

  return { data, error };
};

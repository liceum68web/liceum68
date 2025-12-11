import { APIMiddleware, HTTPMethod } from "@/lib/types";
import { keysToCamelCase } from "@/lib/utils";
import { flow, identity } from "lodash";

const defaultMiddleware = {
  keysToCamelCase,
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
  params: Record<string, string>,
  middleware: APIMiddleware = defaultMiddleware
) => {
  const baseUrl = process.env.CONTENT_API_BASE_URL;
  const apiKey = process.env.CONTENT_API_KEY;
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
        Authorization: `api_client API-Key ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        variables: params,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Content API error: HTTP error ${response.status}; ${errorData}`
      );
    }

    const result = await response.json();

    const transformKeys = flow(
      [middleware?.keysToCamelCase ?? identity].filter(Boolean)
    );

    data = transformKeys(result.data);
  } catch (err) {
    console.error(`Content API error: ${err}`);
    error = err;
  }

  return { data, error };
};

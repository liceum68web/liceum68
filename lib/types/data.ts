export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum APIMiddlewareKeys {
  KEYS_TO_CAMEL_CASE = "keysToCamelCase",
}

export type APIMiddleware = {
   
  [middlewareKey in APIMiddlewareKeys]?: (args: unknown) => unknown;
};

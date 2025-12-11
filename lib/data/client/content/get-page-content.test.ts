import { describe, it, expect, vi } from "vitest";

import { getPageContent } from "./get-page-content";

const mockContentApi = vi.fn();
describe("getPageContent", () => {
  it("Should call content API", () => {
    getPageContent("mockSlug", mockContentApi);

    expect(mockContentApi).toHaveBeenCalledTimes(1);
  });
});

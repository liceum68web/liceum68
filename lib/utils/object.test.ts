import { describe, expect, test } from "vitest";

import { keysToCamelCase, createPropertyIndex, indexedLookUp } from "./object";

describe("keysToCamelCase", () => {
  const testSuite = [
    {
      title: "It should rename flat objects",
      input: { foo_bar: "baz" },
      expectedResult: { fooBar: "baz" },
    },
    {
      title: "It should rename nested objects",
      input: { foo: { bar_baz: "qux" } },
      expectedResult: { foo: { barBaz: "qux" } },
    },
    {
      title: "It should rename arrays",
      input: { foo: [{ bar_baz: "qux" }] },
      expectedResult: { foo: [{ barBaz: "qux" }] },
    },
    {
      title: "It should rename nested arrays",
      input: { foo: [{ bar: { baz_qux: "quux" } }] },
      expectedResult: { foo: [{ bar: { bazQux: "quux" } }] },
    },
  ];

  test.each(testSuite)("$title", ({ input, expectedResult }) => {
    expect(keysToCamelCase(input)).toEqual(expectedResult);
  });
});

describe("createPropertyIndex and indexedLookUp", () => {
  const sampleData = {
    users: [
      { id: "1", name: "Alice", role: { type: "admin" } },
      { id: "2", name: "Bob", role: { type: "user" } },
    ],
    settings: {
      theme: { id: "dark", label: "Dark Mode" },
      language: { id: "en", label: "English" },
    },
    nested: {
      deep: {
        items: [
          { id: "item1", category: "electronics" },
          { id: "item2", category: "books" },
        ],
      },
    },
  };

  test("should create correct index for id property", () => {
    const index = createPropertyIndex(sampleData, "id");

    expect(index.size).toBe(6); // 2 users + 2 settings + 2 items = 6 objects with id
    expect(index.get("1")).toEqual({
      id: "1",
      name: "Alice",
      role: { type: "admin" },
    });
    expect(index.get("dark")).toEqual({ id: "dark", label: "Dark Mode" });
    expect(index.get("en")).toEqual({ id: "en", label: "English" });
    expect(index.get("item1")).toEqual({
      id: "item1",
      category: "electronics",
    });
  });

  test("should create correct index for type property", () => {
    const index = createPropertyIndex(sampleData, "type");

    expect(index.size).toBe(2);
    expect(index.get("admin")).toEqual({ type: "admin" });
    expect(index.get("user")).toEqual({ type: "user" });
  });

  test("should handle empty objects and arrays", () => {
    const emptyData = { empty: {}, emptyArray: [] };
    const index = createPropertyIndex(emptyData, "id");

    expect(index.size).toBe(0);
  });

  test("should handle null and undefined values", () => {
    const nullData = { item: { id: null }, item2: { id: undefined } };
    const index = createPropertyIndex(nullData, "id");

    expect(index.size).toBe(0);
  });

  test("should return empty map for invalid key", () => {
    const index = createPropertyIndex(sampleData, "");
    expect(index.size).toBe(0);
  });

  test("indexedLookUp should find correct objects", () => {
    const index = createPropertyIndex(sampleData, "id");

    expect(indexedLookUp(index, "1")).toEqual({
      id: "1",
      name: "Alice",
      role: { type: "admin" },
    });
    expect(indexedLookUp(index, "nonexistent")).toBe(null);
  });

  test("should handle duplicate property values (last one wins)", () => {
    const dataWithDuplicates = {
      items: [
        { id: "duplicate", value: "first" },
        { id: "duplicate", value: "second" },
      ],
    };

    const index = createPropertyIndex(dataWithDuplicates, "id");
    const result = indexedLookUp(index, "duplicate");

    expect(result).toEqual({ id: "duplicate", value: "second" });
  });

  test("should handle various lookup scenarios correctly", () => {
    const testCases = [
      {
        key: "id",
        value: "1",
        expected: { id: "1", name: "Alice", role: { type: "admin" } },
      },
      {
        key: "id",
        value: "dark",
        expected: { id: "dark", label: "Dark Mode" },
      },
      {
        key: "type",
        value: "admin",
        expected: { type: "admin" },
      },
      {
        key: "category",
        value: "books",
        expected: { id: "item2", category: "books" },
      },
      {
        key: "nonexistent",
        value: "missing",
        expected: null,
      },
    ];

    for (const { key, value, expected } of testCases) {
      const index = createPropertyIndex(sampleData, key);
      const result = indexedLookUp(index, value);
      expect(result).toEqual(expected);
    }
  });

  test("performance: multiple lookups should be fast with same index", () => {
    const index = createPropertyIndex(sampleData, "id");

    // Multiple lookups should be O(1) each
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      indexedLookUp(index, "1");
      indexedLookUp(index, "dark");
      indexedLookUp(index, "item1");
    }
    const end = performance.now();

    // This should be very fast (< 10ms for 3000 lookups)
    expect(end - start).toBeLessThan(50);
  });
});

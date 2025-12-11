import { expect } from "vitest";
import "../app/globals.css";
import "@testing-library/jest-dom/vitest";
import * as extensions from "@testing-library/jest-dom/matchers";

expect.extend(extensions);

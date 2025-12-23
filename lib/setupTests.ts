import * as extensions from "@testing-library/jest-dom/matchers";

import "../app/globals.css";
import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";

expect.extend(extensions);

import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenKeys(item, `${prefix}[${index}]`));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      flattenKeys(nestedValue, prefix ? `${prefix}.${key}` : key),
    );
  }

  return [prefix];
}

describe("localized messages", () => {
  it("keeps English and Spanish keys in parity", () => {
    expect(flattenKeys(en).sort()).toEqual(flattenKeys(es).sort());
  });
});

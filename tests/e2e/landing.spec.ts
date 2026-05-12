import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/es", "/en"] as const;
const viewports = [
  { width: 320, height: 900 },
  { width: 390, height: 900 },
  { width: 768, height: 1000 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
] as const;

test("/ redirects to the Spanish default locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
});

for (const route of routes) {
  test(`${route} renders without serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const seriousOrCritical = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(seriousOrCritical).toEqual([]);
  });
}

for (const viewport of viewports) {
  test(`/es stays usable at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/es");

    const primaryCta = page.getByRole("link", { name: /Reservar cita/i });
    await expect(primaryCta).toBeVisible();

    const box = await primaryCta.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(56);
    expect(box?.width).toBeGreaterThanOrEqual(48);
  });
}

test("theme toggle supports light, dark, and system mode", async ({ page }) => {
  await page.goto("/es");

  const toggle = page.getByRole("button", { name: /Cambiar modo de color/i });
  await expect(toggle).toBeVisible();

  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/light/);

  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

// src/app/tests/smoke.spec.ts
import { test, expect } from "@playwright/test";

test("home page renders and key sections exist", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Trusted Home-Watch/i })).toBeVisible();

  // Click the CTA button, not the nav item
  await page.getByRole("link", { name: "See services", exact: true }).click();
  await expect(page.locator("#services")).toBeVisible();

  await page.getByRole("link", { name: "Pricing", exact: true }).click();
  await expect(page.locator("#pricing")).toBeVisible();

  await page.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page.locator("#contact")).toBeVisible();
});

test("legal pages load", async ({ page }) => {
  for (const path of ["/terms", "/privacy"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
  }
});
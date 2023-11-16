import { test, expect } from "@playwright/test";
test("has title", async ({ page }) => {
    await page.goto(`https://www.wupdoc.com/best-doctors?page=${pageIndex}`);
  await expect(page).toHaveTitle(/The Best 100 Doctors on Wupdoc/);
});

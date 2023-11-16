import fs from "node:fs";
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  let pageIndex = 0;

  fs.rmSync(`./tests/page-all.jsonl`, { force: true });

  while(pageIndex++ < 10) {
    fs.rmSync(`./tests/page-${pageIndex}.jsonl`, { force: true });

    await page.goto(`https://www.wupdoc.com/best-doctors?page=${pageIndex}`);

    const lis = await page.locator("main > ul > li").all();

    lis.forEach(element => {
      element.locator(".flex-1 span").first().innerText().then((location) => {
        element.locator("a h3").first().innerText().then((name) => {
            const detailsElement = element.locator(".flex-1 > div:nth-of-type(2)").first();
            detailsElement.locator("p").first().innerText().then((description) => {
              fs.appendFileSync(`./tests/page-${pageIndex}.jsonl`, `{"messages": [{"role": "system", "content": "Medical Center Name:${name.replace("\"", "")}; Medical Center Location:${location.replace("\"", "")}; Medical Center Description:${description.replace("\"", "")};"}]}\n`);
              fs.appendFileSync(`./tests/page-all.jsonl`, `{"messages": [{"role": "system", "content": "Medical Center Name:${name.replace("\"", "")}; Medical Center Location:${location.replace("\"", "")}; Medical Center Description:${description.replace("\"", "")};"}]}\n`);
            });
        });
      });
    });
  }

  await expect(page).toHaveTitle(/The Best 100 Doctors on Wupdoc/);
});

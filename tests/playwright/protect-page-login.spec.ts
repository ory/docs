import { test, expect } from '@playwright/test';
import {randomEmail, randomString} from "./helpers";

test.slow() // extend the base timeouts

test.describe('protect-page-login', () => {
  for (const app of [
    { url: 'http://localhost:3001/', name: 'next.js' },
    { url: 'http://localhost:3002/', name: 'express.js' },
    { url: 'http://localhost:3003/', name: 'go'},
    { url: 'http://localhost:3004/', name: 'php'},
    { url: 'http://localhost:3005/', name: 'flutter_web_redirect'}
  ]){
    test.describe(app.name, async() => {
      test('able to use login and sign up', async ({ page }) => {
        await page.goto(app.url, { waitUntil: 'networkidle' });

        await expect(page).toHaveURL(/.*\/\.ory\/ui\/login.*/);

        await page.click('[data-testid="cta-link"]');
        await expect(page).toHaveURL(/.*\/\.ory\/ui\/registration.*/)

        const email = randomEmail()

        await page.fill('[name="traits.email"]', email)
        await page.fill('[name="password"]', randomString())
        await page.click('[value="password"]')

        // we need a different way to test flutter since it renderes a canvas instead of html elements
        if (app.name.includes('flutter')) {
          await expect(page).toHaveURL(`${app.url}#/`)
          expect(await page.locator('body').screenshot()).toMatchSnapshot(`${app.name}.png`, {threshold: 1.0})
        } else {
          await expect(page).toHaveURL(app.url)
          await expect(page.locator('body')).toContainText(email)
        }

      });
    })
  }
});

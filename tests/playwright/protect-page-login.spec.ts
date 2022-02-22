import { test, expect } from '@playwright/test';
import {randomEmail, randomString} from "./helpers";

test.describe('protect-page-login', () => {
  for (const app of [
    { url: 'http://localhost:3001/', name: 'next.js' },
    { url: 'http://localhost:3002/', name: 'express.js' },
    { url: 'http://localhost:3003/', name: 'go'},
<<<<<<< HEAD
    { url: 'http://localhost:3004/', name: 'php'},
=======
    { url: 'http://localhost:3004/', name: 'flutter_web_redirect'}
>>>>>>> feat: flutter web example using redirects
  ]){
    test.describe(app.name, async() => {
      test('able to use login and sign up', async ({ page }) => {
        await page.goto(app.url, { waitUntil: 'networkidle' });

        expect(page.url()).toContain('/.ory/ui/login')

        await page.click('[data-testid="cta-link"]');
        expect(page.url()).toContain('/.ory/ui/registration')

        const email = randomEmail()

        await page.fill('[name="traits.email"]', email)
        await page.fill('[name="password"]', randomString())
        await page.click('[value="password"]')

        expect(page.url()).toEqual(app.url)
        await expect(page.locator('body')).toContainText(email)
      });
    })
  }
});

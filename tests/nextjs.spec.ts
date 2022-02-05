import { test, expect, Page } from '@playwright/test';
import {randomEmail, randomString} from "./helpers";

test.describe('Page is protected', () => {
  test('redirects to login', async ({ page }) => {
    await page.goto('http://localhost:3001/');
    await page.waitForNavigation({ waitUntil: 'networkidle' });

    expect(page.url()).toContain('http://localhost:3001/api/.ory/ui/login')

    await page.click('[data-testid="cta-link"]');
    expect(page.url()).toContain('http://localhost:3001/api/.ory/ui/registration')

    const email = randomEmail()

    await page.fill('[name="traits.email"]', email)
    await page.fill('[name="password"]', randomString())
    await page.click('[value="password"]')

    expect(page.url()).toEqual('http://localhost:3001/')
    await expect(page.locator('h1')).toContainText(email)
  });
});

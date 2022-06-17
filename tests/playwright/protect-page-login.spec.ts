import { test, expect, Page } from '@playwright/test'
import { randomEmail, randomString } from './helpers'

const login = async (page: Page) => {
  const email = randomEmail()
  await page.fill('[name="traits.email"]', email)
  await page.fill('[name="password"]', randomString())
  await page.click('[value="password"]')
  return email
}

test.describe('protect-page-login', () => {
  for (const app of [
    { url: 'http://localhost:3001/', name: 'next.js' },
    { url: 'http://localhost:3002/', name: 'express.js' },
    { url: 'http://localhost:3003/', name: 'go' },
    { url: 'http://localhost:3004/', name: 'php' },
    { url: 'http://localhost:3005/', name: 'flutter_web_redirect' }
  ]) {
    test.describe(app.name, async () => {
      test('able to use login and sign up', async ({ page }) => {
        await page.goto(app.url, { waitUntil: 'networkidle' })

        await expect(page).toHaveURL(/.*\/\.ory\/ui\/login.*/)

        await page.click('[data-testid="cta-link"]')
        await expect(page).toHaveURL(/.*\/\.ory\/ui\/registration.*/)

        const email = await login(page)

        // we need a different way to test flutter since it renderes a canvas instead of html elements
        if (app.name.includes('flutter')) {
          await expect(page).toHaveURL(`${app.url}#/`)
          expect(await page.locator('body').screenshot()).toMatchSnapshot(`${app.name}.png`, { threshold: 1.0 })
        } else {
          await expect(page).toHaveURL(app.url)
          await expect(page.locator('body')).toContainText(email)
        }
      })
    })
  }
})

test.describe('Single Page App + API', () => {
  test('able to use login and sign up', async ({ page }) => {
    await page.goto('http://localhost:4006/')
    await page.locator('[data-testid="sign-up"]').click()
    await expect(page).toHaveURL(/.*\/ui\/registration.*/)

    const email = await login(page)
    await expect(page).toHaveURL(/.*\/localhost:4006.*/)

    await expect(page.locator('[data-testid="ory-response"]')).toContainText('password')
    await expect(page.locator('[data-testid="api-response"]')).toContainText(email)


    await page.locator('[data-testid="settings"]').click()
    await expect(page).toHaveURL(/.*\/ui\/settings.*/)

    await page.goto('http://localhost:4006/')
    await page.waitForLoadState('networkidle')
    await page.locator('[data-testid="logout"]').click()
    await expect(page).toHaveURL(/.*\/localhost:4006.*/)

    // Click a:has-text("Login")
    await page.locator('[data-testid="sign-in"]').click()
    await expect(page).toHaveURL(/.*\/ui\/login.*/)
  })
})

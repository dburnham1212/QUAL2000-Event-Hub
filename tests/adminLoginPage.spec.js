import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/admin/login');
});

test('Testing if we can navigate to admin dashboard', async ({ page }) => {
  await expect(page.locator('span')).toContainText('Protected dashboard');
});

test('Testing if we can login with correct credentials to admin dashboard', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Admin Username' }).click();
  await page.getByRole('textbox', { name: 'Admin Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Admin Password' }).click();
  await page.getByRole('textbox', { name: 'Admin Password' }).fill('admin');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('section')).toContainText('Admin dashboard');
});

test('Testing if return to public site returns the user to the public site', async ({ page }) => {
  await page.getByRole('link', { name: 'Return To Public Site' }).click();
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Testing if login with incorrect password shows an error', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Admin Username' }).click();
  await page.getByRole('textbox', { name: 'Admin Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Admin Password' }).click();
  await page.getByRole('textbox', { name: 'Admin Password' }).fill('admin1');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('section')).toContainText('Incorrect username or password.');
});

test('Testing if login with incorrect username shows an error', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Admin Username' }).click();
  await page.getByRole('textbox', { name: 'Admin Username' }).fill('admin1');
  await page.getByRole('textbox', { name: 'Admin Password' }).click();
  await page.getByRole('textbox', { name: 'Admin Password' }).fill('amin');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.locator('section')).toContainText('Incorrect username or password.');
});

test('Testing if typing in nothing to name field will provide a validation error', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign In' }).click();
  const isValid = await page.getByRole('textbox', { name: 'Admin Username' }).evaluate(el => el.checkValidity());
  expect(isValid).toBe(false);
});

test('Testing if typing a valid username and nothing in the password field will provide validation error', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Admin Username' }).click();
  await page.getByRole('textbox', { name: 'Admin Username' }).fill('admin');
  await page.getByRole('button', { name: 'Sign In' }).click();
  const isValid = await page.getByRole('textbox', { name: 'Admin Password' }).evaluate(el => el.checkValidity());
  expect(isValid).toBe(false);
});
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

// ============ Landing Page Testing ============
test('Testing if we can reach the homepage', async ({ page }) => {
  await expect(page.locator('body')).toContainText('Event Hub');
});

test('Testing if "Browse Events" button works in hero section', async ({ page }) => {
  await page.getByRole('link', { name: 'Browse Events' }).click();
  await expect(page).toHaveURL(/events/);
  await expect(page.locator('body')).toContainText('Explore the full Event Hub lineup.');
});

test('Testing if the "Create Your Account" button works in hero section', async ({ page }) => {
  await page.getByRole('link', { name: 'Create Your Account' }).click();
  await expect(page).toHaveURL(/register/);
  await expect(page.locator('body')).toContainText('Create your account');
});

test('Testing if clicking on an event from browse list navigates to the event', async ({ page }) => {
  await page.getByRole('link', { name: 'Music May 14, 2026 Kingston' }).click();
  await expect(page).toHaveURL(/events/);
  await expect(page.locator('body')).toContainText('Single event details');
});

test('Testing if clicking "See All Events" button works at bottom of homepage', async ({ page }) => {
  await page.getByRole('link', { name: 'See All Events' }).click();
  await expect(page).toHaveURL(/events/);
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Tsting if clicking "Log In To Manage Events" button works at bottom of homepage', async ({ page }) => {
  await page.getByRole('link', { name: 'Log In To Manage Events' }).click();
  await expect(page).toHaveURL(/login/);
  await expect(page.getByRole('heading')).toContainText('Log in to manage your events.');
});
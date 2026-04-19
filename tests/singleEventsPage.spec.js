import { test, expect } from '@playwright/test';

// ============ Events Page Testing ============
test('Testing if typing a specific event id shows the single event details', async ({ page }) => {
  await page.goto('http://localhost:3000/events/69dad6db88984d50905b3709');
  await expect(page.getByText('Single event details')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Kingston Spring Music Festival' })).toBeVisible();
});

test('Testing if clicking on "Login To Register" button takes you to the login page', async ({ page }) => {
  await page.goto('http://localhost:3000/events/69dad6db88984d50905b3709');
  await page.getByRole('link', { name: 'Log In To Register' }).click();
  await expect(page.getByRole('heading', { name: 'Log in to manage your events.' })).toBeVisible();
});

test('Testing if clicking on "Create Account" button takes you to the account creation page', async ({ page }) => {
  await page.goto('http://localhost:3000/events/69dad6db88984d50905b3709');
  await page.getByRole('complementary').getByRole('link', { name: 'Create Account' }).click();
  await expect(page.getByText('Create your account')).toBeVisible();
});

test('Testing if clicking on "Back To Events" button takes you to the public directory', async ({ page }) => {
  await page.goto('http://localhost:3000/events/69dad6db88984d50905b3709');
  await page.getByRole('link', { name: 'Back To Events' }).click();
  await expect(page.getByText('Public events directory')).toBeVisible();
});

test('Testing if clicking on "Register For This Event" takes you to the registration form', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Browse More Events' }).click();
  await page.getByRole('link', { name: 'Music May 14, 2026 Kingston' }).click();
  await page.getByRole('link', { name: 'Register For This Event' }).click();
  await expect(page.locator('body')).toContainText('Registration form');
});
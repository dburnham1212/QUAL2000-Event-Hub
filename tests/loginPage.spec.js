import { test, expect } from '@playwright/test';
import { getBaseURL } from './utils/helper';

test.beforeEach(async ({ page }) => {
  await page.goto(`${getBaseURL()}/login`);
});

// ============ Login Page Testing ============
test('Testing if navigating to login page manually displays the login page', async ({ page }) => {
  await expect(page.getByRole('heading')).toContainText('Log in to manage your events.');
});

test('Testing if an already created user can login', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.locator('body')).toContainText('You are now logged in.');
});

test('Testing if an already created user will not logged in with an incorrect password', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.locator('section')).toContainText('Incorrect email address or password.');
});

test('Testing if an unknown email and existing password rejects user', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.locator('section')).toContainText('Incorrect email address or password.');
});

test('Testing if "Create New Account" button takes you to the register page', async ({ page }) => {
  await page.getByRole('link', { name: 'Create New Account' }).click();
  await expect(page.locator('section')).toContainText('Create your account');
});

test('Testing for empty input for email field', async ({ page }) => {
  await page.getByRole('button', { name: 'Log In' }).click();
  const isValid = await page.getByRole('textbox', { name: 'Email Address' }).evaluate(el => el.checkValidity());
  expect(isValid).toBe(false);
});

test('Testing for invalid input for email field', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham');
  const isValid = await page.getByRole('textbox', { name: 'Email Address' }).evaluate(el => el.checkValidity());
  expect(isValid).toBe(false);
});

test('Testing for empty password field', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
  await page.getByRole('button', { name: 'Log In' }).click();
  const isValid = await page.getByRole('textbox', { name: 'Password' }).evaluate(el => el.checkValidity());
  expect(isValid).toBe(false);
});

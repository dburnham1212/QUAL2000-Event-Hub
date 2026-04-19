import { test, expect } from '@playwright/test';

test('Testing if clicking "Add To My Calendar" button adds the event successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Browse More Events' }).click();
  await page.getByRole('link', { name: 'Music May 14, 2026 Kingston' }).click();
  await page.getByRole('link', { name: 'Register For This Event' }).click();
  await page.getByRole('button', { name: 'Add To My Calendar' }).click();
  await expect(page.locator('body')).toContainText('Registration created successfully.');
});

test('Testing if clicking "Back To Event" button returns to the event successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/events/registrations');
  await page.getByRole('link', { name: 'Browse More Events' }).click();
  await page.getByRole('link', { name: 'Music May 14, 2026 Kingston' }).click();
  await page.getByRole('link', { name: 'Register For This Event' }).click();
  await page.getByRole('link', { name: 'Back To Event' }).click();
  await expect(page.locator('body')).toContainText('Single event details');
});

test('Testing if clicking "Update My Seats" and updating seat count updates the registration', async ({ page }) => {
  await page.goto('http://localhost:3000/events/registrations');
  await page.getByRole('link', { name: 'Browse More Events' }).click();
  await page.getByRole('link', { name: 'Music May 14, 2026 Kingston' }).click();
  await page.getByRole('link', { name: 'Update My Seats' }).click();
  await page.getByRole('spinbutton', { name: 'Seat Count' }).click();
  await page.getByRole('spinbutton', { name: 'Seat Count' }).fill('4');
  await page.getByRole('button', { name: 'Save Seat Changes' }).click();
  await expect(page.locator('body')).toContainText('Registration updated successfully.');
});
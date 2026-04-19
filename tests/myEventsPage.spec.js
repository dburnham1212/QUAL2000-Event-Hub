import { test, expect } from '@playwright/test';

// ============ My Events Page Testing ============
test('Testing if clicking "Browse More Events" button takes you to the public events directory', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Browse More Events' }).click();
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Testing if clicking "Open My Calendar" button takes you to the calendar view', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
  await page.getByRole('textbox', { name: 'Email Address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Open My Calendar' }).click();
  await expect(page.locator('body')).toContainText('Calendar view');
});

test('Testing if clicking on "Browse Events" button when events list is empty', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Browse Events' }).click();
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Testing if clicking on an added event takes you to the Single event details page', async ({ page }) => {
  await page.goto('http://localhost:3000/events/registrations');
  await page.getByRole('link', { name: 'Kingston Spring Music Festival' }).click();
  await expect(page.locator('body')).toContainText('Single event details');
});

test('Testing if clicking "Edit seats" on an added event takes you to the Update seats page', async ({ page }) => {
  await page.goto('http://localhost:3000/events/registrations');
  await page.getByRole('link', { name: 'Edit Seats' }).click();
  await expect(page.locator('body')).toContainText('Update seats');
});

test('Testing if clicking "Remove Event" removes the registration from the calendar', async ({ page }) => {
  await page.goto('http://localhost:3000/events/registrations');
  await page.getByRole('button', { name: 'Remove Event' }).click();
  await expect(page.locator('body')).toContainText('Registration removed from your calendar.');
});
import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './utils/helper';

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);  
});

test('Clicking on add new event takes you to event creation screen', async ({ page }) => {
  await page.goto('/admin/events');
  await page.getByRole('link', { name: 'Add New Event' }).click();
  await expect(page.locator('section')).toContainText('Create event');
});

test('Clicking on edit event takes you to the update event form ', async ({ page }) => {
  await page.goto('/admin/events');
  await expect(page.locator('tr', { hasText: 'Kingston Spring Music' })).toBeVisible();
  await page.locator('tr', { hasText: 'Kingston Spring Music' }).getByRole('link', { name: 'Edit' }).click();
  await expect(page.locator('section')).toContainText('Update event');
});

// test('Clicking on delete event successfully deletes the event', async ({ page }) => {
//   await page.goto('http://localhost:3000/admin/events');
//   await expect(
//   page.locator('tr', { hasText: 'Kingston Spring Music' })
// ).toBeVisible();
//   await page.locator('tr', { hasText: 'Kingston Spring Music' }).getByRole('button', { name: 'Delete' }).click();
//   await expect(page.locator('section')).toContainText('Event deleted successfully.');
// });
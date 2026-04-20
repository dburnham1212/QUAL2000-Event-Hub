import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsUser } from './utils/helper';

// ============ Events Page Testing ============
test('Testing if typing in /events to address bar shows the events page', async ({ page }) => {
  await loginAsUser(page);
  await page.goto('/events');
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Testing if navigating to a single event shows the event', async ({ page }) => {
  await loginAsUser(page);
  await page.goto('/events');
  await page.getByRole('link', { name: 'Music May 14, 2026 Kingston' }).click();
  await expect(page.locator('h1')).toContainText('Kingston Spring Music Festival');
});

test('Testing if event with earlier date than all events is added to top of list', async ({ page }) => {
  await loginAsAdmin(page);
  
  await page.goto('/admin/events');
  await page.getByRole('link', { name: 'Add New Event' }).click();
  await page.getByRole('textbox', { name: 'Event Title' }).click();
  await page.getByRole('textbox', { name: 'Event Title' }).fill('Toast Lovers');
  await page.getByRole('textbox', { name: 'Event Date' }).fill('2026-05-11');
  await page.getByRole('textbox', { name: 'Location' }).click();
  await page.getByRole('textbox', { name: 'Location' }).fill('Kingston, CA');
  await page.getByRole('textbox', { name: 'Category' }).click();
  await page.getByRole('textbox', { name: 'Category' }).fill('Toast');
  await page.getByRole('textbox', { name: 'Image URL' }).click();
  await page.getByRole('textbox', { name: 'Image URL' }).fill('https://jessup.edu/wp-content/uploads/2023/12/Programming-in-Computer-Science-NEW.webp');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Toast Lovers Unite');
  await page.getByRole('spinbutton', { name: 'Available Slots' }).click();
  await page.getByRole('spinbutton', { name: 'Available Slots' }).fill('10');
  await page.getByRole('button', { name: 'Create Event' }).click();
  await page.getByRole('link', { name: 'View Public Site' }).click();
  const firstItem = page.locator('.event-list-item').first();

  await expect(firstItem).toContainText('Toast Lovers');
});

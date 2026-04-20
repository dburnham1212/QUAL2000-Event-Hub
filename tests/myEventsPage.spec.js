import { test, expect } from '@playwright/test';
import { loginAsUser, loginAsAdmin, createTestEvent } from './utils/helper';

// ============ My Events Page Testing ============
test('Testing if clicking "Browse More Events" button takes you to the public events directory', async ({ page }) => {
  await loginAsUser(page);
  await page.getByRole('link', { name: 'Browse More Events' }).click();
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Testing if clicking "Open My Calendar" button takes you to the calendar view', async ({ page }) => {
  await loginAsUser(page);
  await page.getByRole('link', { name: 'Open My Calendar' }).click();
  await expect(page.locator('body')).toContainText('Calendar view');
});

test('Testing if clicking on "Browse Events" button when events list is empty', async ({ page }) => {
  await loginAsUser(page);
  await page.getByRole('link', { name: 'Browse Events' }).click();
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Testing if clicking on an added event takes you to the Single event details page', async ({ page }) => {
  await loginAsAdmin(page);
  const testEventName = await createTestEvent(page);

  await loginAsUser(page);
  await page.goto("/events");
  await page.locator('.event-list-item').filter({ hasText: testEventName }).getByRole('link').click();
  await page.getByRole("link", { name: "Register For This Event" }).click();
  await page.getByRole("spinbutton", { name: "Seat Count" }).click();
  await page.getByRole("spinbutton", { name: "Seat Count" }).fill("10");
  await page.getByRole("button", { name: "Add To My Calendar" }).click();
  await expect(page.locator("body")).toContainText(
    "Registration created successfully.",
  );

  await page.goto('/events/registrations');
  await expect(page.locator('table')).toBeVisible();
  await page.locator('tr').filter({ hasText: testEventName }).getByRole('link').first().click();
  await expect(page.locator('body')).toContainText('Single event details');

  await loginAsAdmin(page);
  await expect(page.locator('tr', { hasText: testEventName })).toBeVisible();
  await page.locator('tr', { hasText: testEventName }).getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator("section")).toContainText(
    "Event deleted successfully.",
  );
});

test('Testing if clicking "Edit seats" on an added event takes you to the Update seats page', async ({ page }) => {
  await loginAsAdmin(page);
  const testEventName = await createTestEvent(page);

  await loginAsUser(page);
  await page.goto("/events");
  await page.locator('.event-list-item').filter({ hasText: testEventName }).getByRole('link').click();
  await page.getByRole("link", { name: "Register For This Event" }).click();
  await page.getByRole("spinbutton", { name: "Seat Count" }).click();
  await page.getByRole("spinbutton", { name: "Seat Count" }).fill("10");
  await page.getByRole("button", { name: "Add To My Calendar" }).click();
  await expect(page.locator("body")).toContainText(
    "Registration created successfully.",
  );

  await page.goto('/events/registrations');
  await expect(page.locator('table')).toBeVisible();
  await page.locator('tr').filter({ hasText: testEventName }).getByRole('link', { name: 'Edit Seats' }).click();
  await expect(page.locator('body')).toContainText('Update seats');

  await loginAsAdmin(page);
  await expect(page.locator('tr', { hasText: testEventName })).toBeVisible();
  await page.locator('tr', { hasText: testEventName }).getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator("section")).toContainText(
    "Event deleted successfully.",
  );
});

test('Testing if clicking "Remove Event" removes the registration from the calendar', async ({ page }) => {
  await loginAsAdmin(page);
  const testEventName = await createTestEvent(page);

  await loginAsUser(page);
  await page.goto("/events");
  await page.locator('.event-list-item').filter({ hasText: testEventName }).getByRole('link').click();
  await page.getByRole("link", { name: "Register For This Event" }).click();
  await page.getByRole("spinbutton", { name: "Seat Count" }).click();
  await page.getByRole("spinbutton", { name: "Seat Count" }).fill("10");
  await page.getByRole("button", { name: "Add To My Calendar" }).click();
  await expect(page.locator("body")).toContainText(
    "Registration created successfully.",
  );

  await page.goto('/events/registrations');
  await expect(page.locator('table')).toBeVisible();
  await page.locator('tr').filter({ hasText: testEventName }).getByRole('button', { name: 'Remove Event' }).click();
  await expect(page.locator('body')).toContainText('Registration removed from your calendar.');

  await loginAsAdmin(page);
  await expect(page.locator('tr', { hasText: testEventName })).toBeVisible();
  await page.locator('tr', { hasText: testEventName }).getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator("section")).toContainText(
    "Event deleted successfully.",
  );
});
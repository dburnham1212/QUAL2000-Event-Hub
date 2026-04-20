import { test, expect } from "@playwright/test";
import { loginAsUser } from "./utils/helper";

test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
    await page.goto("/events");
});

test('Testing if clicking "Add To My Calendar" button adds the event successfully', async ({
    page,
}) => {
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration created successfully.",
    );
});

test('Testing if clicking "Back To Event" button returns to the event successfully', async ({
    page,
}) => {
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("link", { name: "Back To Event" }).click();
    await expect(page.locator("body")).toContainText("Single event details");
});

test('Testing if clicking "Update My Seats" and updating seat count updates the registration', async ({
    page,
}) => {
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await page.getByRole("link", { name: "Update My Seats" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("4");
    await page.getByRole("button", { name: "Save Seat Changes" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration updated successfully.",
    );
});

test("Testing if you can update seats to a negative value", async ({
    page,
}) => {
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await page.getByRole("link", { name: "Edit Seats" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("-1");
    await page.getByRole("spinbutton", { name: "Seat Count" }).press("Enter");
    await page.getByRole("button", { name: "Save Seat Changes" }).click();
});

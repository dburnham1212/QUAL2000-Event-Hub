import { test, expect } from "@playwright/test";
import { createTestEvent, loginAsAdmin, loginAsUser, logoutOfAdmin } from "./utils/helper";

test('Testing if clicking "Add To My Calendar" button adds the event successfully', async ({
    page,
}) => {
    // Login as admin and create test event
    await loginAsAdmin(page);
    const testName = await createTestEvent(page);
    await logoutOfAdmin(page);

    // Login as user so we can register
    await loginAsUser(page);

    // Check if registration works
    await page.goto("/events");
    await page
        .getByRole("link", { name: `Test April 30, 2026 ${testName} Test` })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration created successfully.",
    );

    // Log back in as admin and delete the event
    await loginAsAdmin(page);
    await page
        .getByRole("row", { name: `${testName} April 30,` })
        .getByRole("button")
        .click();
    await expect(page.locator("section")).toContainText(
        "Event deleted successfully.",
    );
});

test('Testing if clicking "Back To Event" button returns to the event successfully', async ({
    page,
}) => {
    await loginAsUser(page);
    await page.goto("/events");
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
    // Login as admin and create test event
    await loginAsAdmin(page);
    const testName = await createTestEvent(page);
    await logoutOfAdmin(page);

    // Login as user so we can register
    await loginAsUser(page);

    // Check register works with specified seat count
    await page.goto("/events");
    await page
        .getByRole("link", { name: `Test April 30, 2026 ${testName} Test` })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("4");
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration created successfully.",
    );

    // Log back in as admin and delete the event
    await loginAsAdmin(page);
    await page
        .getByRole("row", { name: `${testName} April 30,` })
        .getByRole("button")
        .click();
    await expect(page.locator("section")).toContainText(
        "Event deleted successfully.",
    );
});

test("Testing if you can set seats to a negative value", async ({ page }) => {
    // Login as admin and create test event
    await loginAsAdmin(page);
    const testName = await createTestEvent(page);
    await logoutOfAdmin(page);

    // Login as user so we can register
    await loginAsUser(page);

    // Check register works with negative seat count
    await page.goto("/events");
    await page
        .getByRole("link", { name: `Test April 30, 2026 ${testName} Test` })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("-1");
    await page.getByRole("button", { name: "Add To My Calendar" }).click();

    const isValid = await page
        .getByRole("spinbutton", { name: "Seat Count" })
        .evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);

    // Log back in as admin and delete the event
    await loginAsAdmin(page);
    await page
        .getByRole("row", { name: `${testName} April 30,` })
        .getByRole("button")
        .click();
    await expect(page.locator("section")).toContainText(
        "Event deleted successfully.",
    );
});

test("Testing if you can set seats to an amount that exceeds max seat amount", async ({
    page,
}) => {
    // Login as admin and create test event
    await loginAsAdmin(page);
    const testName = await createTestEvent(page);
    await logoutOfAdmin(page);

    // Login as user so we can register
    await loginAsUser(page);

    // Check register works with negative seat count
    await page.goto("/events");
    await page
        .getByRole("link", { name: `Test April 30, 2026 ${testName} Test` })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("11");
    await page.getByRole("button", { name: "Add To My Calendar" }).click();

    const isValid = await page
        .getByRole("spinbutton", { name: "Seat Count" })
        .evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);

    // Log back in as admin and delete the event
    await loginAsAdmin(page);
    await page
        .getByRole("row", { name: `${testName} April 30,` })
        .getByRole("button")
        .click();
    await expect(page.locator("section")).toContainText(
        "Event deleted successfully.",
    );
});

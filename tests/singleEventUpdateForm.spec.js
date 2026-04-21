import { test, expect } from "@playwright/test";
import { createTestEvent, loginAsAdmin, loginAsUser, logoutOfAdmin } from "./utils/helper";

test('Testing if clicking "Back To My Events" button returns you to event page successfully', async ({
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
        .getByRole("link", { name: testName })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration created successfully.",
    );

    await page.goto("/events/registrations");
    await page
        .locator("tr", { hasText: testName })
        .getByRole("link", { name: "Edit Seats" })
        .click();
    await expect(page).toHaveURL(/events\/registrations/);
    await page.getByRole("link", { name: "Back To My Events" }).click();
    await expect(page.locator("body")).toContainText("My saved events");

    // Log back in as admin and delete the event
    await loginAsAdmin(page);
    await page
        .getByRole("row", { name: testName })
        .getByRole("button")
        .click();
    await expect(page.locator("section")).toContainText(
        "Event deleted successfully.",
    );
});

test("Testing if you can update seats to a negative value", async ({
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
        .getByRole("link", { name: testName })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration created successfully.",
    );

    await page.goto("/events/registrations");
    await page
        .locator("tr", { hasText: testName })
        .getByRole("link", { name: "Edit Seats" })
        .click();
    await expect(page).toHaveURL(/events\/registrations/);
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("-1");
    await page.getByRole("button", { name: "Save Seat Changes" }).click();
    const isValid = await page
        .getByRole("spinbutton", { name: "Seat Count" })
        .evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);

    // Log back in as admin and delete the event
    await loginAsAdmin(page);
    await page
        .getByRole("row", { name: testName })
        .getByRole("button")
        .click();
    await expect(page.locator("section")).toContainText(
        "Event deleted successfully.",
    );
});

test("Testing if you can update seats to an amount that exceeds max seat amount", async ({
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
        .getByRole("link", { name: testName })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration created successfully.",
    );

    await page.goto("/events/registrations");
    await page
        .locator("tr", { hasText: testName })
        .getByRole("link", { name: "Edit Seats" })
        .click();
    await expect(page).toHaveURL(/events\/registrations/);
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("11");
    await page.getByRole("button", { name: "Save Seat Changes" }).click();
    const isValid = await page
        .getByRole("spinbutton", { name: "Seat Count" })
        .evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);

    // Log back in as admin and delete the event
    await loginAsAdmin(page);
    await page
        .getByRole("row", { name: testName })
        .getByRole("button")
        .click();
    await expect(page.locator("section")).toContainText(
        "Event deleted successfully.",
    );
});

test("Testing if you can update seats to a valid amount of 5", async ({
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
        .getByRole("link", { name: testName })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration created successfully.",
    );

    await page.goto("/events/registrations");
    await page
        .locator("tr", { hasText: testName })
        .getByRole("link", { name: "Edit Seats" })
        .click();
    await expect(page).toHaveURL(/events\/registrations/);
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("5");
    await page.getByRole("button", { name: "Save Seat Changes" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration updated successfully.",
    );

    // Log back in as admin and delete the event
    await loginAsAdmin(page);
    await page
        .getByRole("row", { name: testName })
        .getByRole("button")
        .click();
    await expect(page.locator("section")).toContainText(
        "Event deleted successfully.",
    );
});

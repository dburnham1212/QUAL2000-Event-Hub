import { test, expect } from "@playwright/test";
import {
    loginAsAdmin,
    loginAsUser,
    loginAsSecondaryUser,
    createTestEvent,
    logoutOfAdmin,
} from "./utils/helper";

// ============ Events Page Testing ============
test("Testing if navigating to a specific event id shows the single event details", async ({
    page,
}) => {
    await page.goto("/events");
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await expect(page.getByText("Single event details")).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Kingston Spring Music Festival" }),
    ).toBeVisible();
});

test('Testing if clicking on "Login To Register" button takes you to the login page', async ({
    page,
}) => {
    await page.goto("/events");
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await page.getByRole("link", { name: "Log In To Register" }).click();
    await expect(
        page.getByRole("heading", { name: "Log in to manage your events." }),
    ).toBeVisible();
});

test('Testing if clicking on "Create Account" button takes you to the account creation page', async ({
    page,
}) => {
    await page.goto("/events");
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await page
        .getByRole("complementary")
        .getByRole("link", { name: "Create Account" })
        .click();
    await expect(page.getByText("Create your account")).toBeVisible();
});

test('Testing if clicking on "Back To Events" button takes you to the public directory', async ({
    page,
}) => {
    await page.goto("/events");
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await page.getByRole("link", { name: "Back To Events" }).click();
    await expect(page.getByText("Public events directory")).toBeVisible();
});

test('Testing if clicking on "Register For This Event" takes you to the registration form', async ({
    page,
}) => {
    await loginAsUser(page);
    await page.getByRole("link", { name: "Browse More Events" }).click();
    await page
        .getByRole("link", { name: "Music May 14, 2026 Kingston" })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await expect(page.locator("body")).toContainText("Registration form");
});

test("Testing to see if you can register to a full event", async ({ page }) => {
    // Login as admin and create test event
    await loginAsAdmin(page);
    const testName = await createTestEvent(page);
    await logoutOfAdmin(page);

    // Login as user so we can register
    await loginAsUser(page);

    // Register for event as user one
    await page.goto("/events");
    await page
        .getByRole("link", { name: `Test April 30, 2026 ${testName} Test` })
        .click();
    await page.getByRole("link", { name: "Register For This Event" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).click();
    await page.getByRole("spinbutton", { name: "Seat Count" }).fill("10");
    await page.getByRole("button", { name: "Add To My Calendar" }).click();
    await expect(page.locator("body")).toContainText(
        "Registration created successfully.",
    );

    // Logout as user 1
    await page.getByRole("button", { name: "Log Out" }).click();
    await expect(page.locator("body")).toContainText(
        "You have been logged out.",
    );

    // Log in as secondary user
    await loginAsSecondaryUser(page);

    // Trying to register for full event
    await page.goto("/events");
    await page
        .getByRole("link", { name: `Test April 30, 2026 ${testName} Test` })
        .click();
    await expect(page.getByRole("complementary")).toContainText(
        "This event is full",
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

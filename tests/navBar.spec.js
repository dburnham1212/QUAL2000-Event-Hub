import { test, expect } from "@playwright/test";
import { loginAsAdmin, loginAsUser } from "./utils/helper";

// ============ Nav Bar Testing - User Not Logged In ============
test("Testing if clicking on logo takes you to the homepage", async ({
    page,
}) => {
    await page.goto("");
    await page.getByRole("link", { name: "Live Guide Event Hub" }).click();
    await expect(page.locator("h1")).toContainText("Event Hub");
});

test('Testing if clicking on the "Home" link takes you to the hompage', async ({
    page,
}) => {
    await page.goto("");
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page.locator("h1")).toContainText("Event Hub");
});

test('Testing if clicking on the "Events" link takes you to the events page', async ({
    page,
}) => {
    await page.goto("");
    await page.getByRole("link", { name: "Events", exact: true }).click();
    await expect(page.locator("body")).toContainText("Public events directory");
});

test('Testing if clicking on the "Login" link takes you to the login page', async ({
    page,
}) => {
    await page.goto("");
    await page.getByRole("link", { name: "Log In", exact: true }).click();
    await expect(page.getByRole("heading")).toContainText(
        "Log in to manage your events.",
    );
});

test('Testing if clicking on the "Register" link takes you to the register page', async ({
    page,
}) => {
    await page.goto("");
    await page.getByRole("link", { name: "Register" }).click();
    await expect(page.locator("section")).toContainText("Create your account");
});

test('Testing if clicking on the "Create Account" button takes you to the register page ', async ({
    page,
}) => {
    await page.goto("");
    await page.getByRole("link", { name: "Create Account" }).click();
    await expect(page.locator("section")).toContainText("Create your account");
});

test('Testing if clicking on the "Admin Dashboard" button takes you to the admin login page', async ({
    page,
}) => {
    await page.goto("");
    await page.getByRole("link", { name: "Admin Dashboard" }).click();
    await expect(page.locator("span")).toContainText("Protected dashboard");
});

// ============ Nav Bar Testing - User Logged In ============
test('Testing if "Log Out" button works from navbar after successful sign in', async ({
    page,
}) => {
    await loginAsUser(page);
    await page.getByRole("button", { name: "Log Out" }).click();
    await expect(page.locator("body")).toContainText(
        "You have been logged out.",
    );
});

test('Testing if "My Events" button takes you to saved events page', async ({
    page,
}) => {
    await loginAsUser(page);
    await page.getByRole("link", { name: "My Events" }).click();
    await expect(page.locator("body")).toContainText("My saved events");
});

test('Testing if "My Calender" button takes you to event calender', async ({
    page,
}) => {
    await loginAsUser(page);
    await page.getByRole("link", { name: "My Calendar", exact: true }).click();
    await expect(page.locator("body")).toContainText("Calendar view");
});

// ============ Nav Bar Testing - Admin Logged In ============
test('Testing if clicking on "All Events" link takes you to the admin dashboard', async ({
    page,
}) => {
    await loginAsAdmin(page);
    await page.getByRole("link", { name: "All Events" }).click();
    await expect(page.locator("section")).toContainText("Admin dashboard");
});

test('Testing if clicking on "Add Events" link takes you to create event page', async ({
    page,
}) => {
    await loginAsAdmin(page);
    await page.getByRole("link", { name: "Add Event" }).click();
    await expect(page.locator("section")).toContainText("Create event");
});

test('Testing if clicking "View Public Site" link takes you to the public site', async ({
    page,
}) => {
    await loginAsAdmin(page);
    await page.getByRole("link", { name: "View Public Site" }).click();
    await expect(page.locator("body")).toContainText("Public events directory");
});

test('Testing if clicking "Log Out" button returns to the admin login page', async ({
    page,
}) => {
    await loginAsAdmin(page);
    await page.getByRole("button", { name: "Log Out" }).click();
    await expect(page.getByRole("heading")).toContainText(
        "Sign in to manage Event Hub.",
    );
});

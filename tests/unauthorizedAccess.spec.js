import { test, expect } from "@playwright/test";

test("Testing if you can bypass login to see registered events", async ({
    page,
}) => {
    await page.goto("/events/registrations");
    await expect(page.locator("section")).toContainText(
        "Please log in to continue.",
    );
});

test("Testing if you can bypass login to see admin events", async ({
    page,
}) => {
    await page.goto("/admin/events");
    await expect(page.getByRole("heading")).toContainText(
        "Sign in to manage Event Hub.",
    );
});

import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./utils/helper";

test('Testing "Back to Dashboard" button while logged in as admin', async ({
    page,
}) => {
    await loginAsAdmin(page);
    await page.goto("/admin/events/new");
    await page.getByRole("link", { name: "Back To Dashboard" }).click();
    await expect(page.locator("section")).toContainText("Admin dashboard");
});

test("Testing if you can create new event logged in as admin", async ({
    page,
}) => {
    await loginAsAdmin(page);
    await page.goto("/admin/events/new");
    await page.getByRole("textbox", { name: "Event Title" }).click();
    await page
        .getByRole("textbox", { name: "Event Title" })
        .fill(`Fun Function ${Date.now()}`);
    await page.getByRole("textbox", { name: "Event Date" }).fill("2026-04-29");
    await page.getByRole("textbox", { name: "Location" }).click();
    await page.getByRole("textbox", { name: "Location" }).fill("Kingston, CA");
    await page.getByRole("textbox", { name: "Category" }).click();
    await page.getByRole("textbox", { name: "Category" }).fill("Programming");
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page
        .getByRole("textbox", { name: "Image URL" })
        .fill(
            "https://jessup.edu/wp-content/uploads/2023/12/Programming-in-Computer-Science-NEW.webp",
        );
    await page.getByRole("textbox", { name: "Description" }).click();
    await page
        .getByRole("textbox", { name: "Description" })
        .fill("Fun Programming");
    await page.getByRole("spinbutton", { name: "Available Slots" }).click();
    await page.getByRole("spinbutton", { name: "Available Slots" }).fill("5");
    await page.getByRole("button", { name: "Create Event" }).click();
    await expect(page.locator("section")).toContainText(
        "Event created successfully.",
    );
});

test.fixme("BUG: Testing if you can create a duplicate event logged in as admin", async ({
    page,
}) => {
    await loginAsAdmin(page);
    const testEventName = `Fun Function ${Date.now()}`;
    await page.goto("/admin/events/new");
    await page.getByRole("textbox", { name: "Event Title" }).click();
    await page
        .getByRole("textbox", { name: "Event Title" })
        .fill(testEventName);
    await page.getByRole("textbox", { name: "Event Date" }).fill("2026-04-29");
    await page.getByRole("textbox", { name: "Location" }).click();
    await page.getByRole("textbox", { name: "Location" }).fill("Kingston, CA");
    await page.getByRole("textbox", { name: "Category" }).click();
    await page.getByRole("textbox", { name: "Category" }).fill("Programming");
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page
        .getByRole("textbox", { name: "Image URL" })
        .fill(
            "https://jessup.edu/wp-content/uploads/2023/12/Programming-in-Computer-Science-NEW.webp",
        );
    await page.getByRole("textbox", { name: "Description" }).click();
    await page
        .getByRole("textbox", { name: "Description" })
        .fill("Fun Programming");
    await page.getByRole("spinbutton", { name: "Available Slots" }).click();
    await page.getByRole("spinbutton", { name: "Available Slots" }).fill("5");
    await page.getByRole("button", { name: "Create Event" }).click();
    await expect(page.locator("section")).toContainText(
        "Event created successfully.",
    );
    await page.goto("/admin/events/new");
    await page.getByRole("textbox", { name: "Event Title" }).click();
    await page
        .getByRole("textbox", { name: "Event Title" })
        .fill(testEventName);
    await page.getByRole("textbox", { name: "Event Date" }).fill("2026-04-29");
    await page.getByRole("textbox", { name: "Location" }).click();
    await page.getByRole("textbox", { name: "Location" }).fill("Kingston, CA");
    await page.getByRole("textbox", { name: "Category" }).click();
    await page.getByRole("textbox", { name: "Category" }).fill("Programming");
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page
        .getByRole("textbox", { name: "Image URL" })
        .fill(
            "https://jessup.edu/wp-content/uploads/2023/12/Programming-in-Computer-Science-NEW.webp",
        );
    await page.getByRole("textbox", { name: "Description" }).click();
    await page
        .getByRole("textbox", { name: "Description" })
        .fill("Fun Programming");
    await page.getByRole("spinbutton", { name: "Available Slots" }).click();
    await page.getByRole("spinbutton", { name: "Available Slots" }).fill("5");
    await page.getByRole("button", { name: "Create Event" }).click();
    await expect(page.locator("section")).toContainText(
        "Event not created successfully.",
    );
});

test.fixme("BUG: Testing if you can create an event with no input", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/events/new");
    await page.getByRole("button", { name: "Create Event" }).click();
    const isEventTitleValid = await page
        .getByRole("textbox", { name: "Event Title" })
        .evaluate((el) => el.checkValidity());
    expect(isEventTitleValid).toBe(false);
    const isEventDateValid = await page
        .getByRole("textbox", { name: "Event Date" })
        .evaluate((el) => el.checkValidity());
    expect(isEventDateValid).toBe(false);
    const isLocationValid = await page
        .getByRole("textbox", { name: "Location" })
        .evaluate((el) => el.checkValidity());
    expect(isLocationValid).toBe(false);
    const isCategoryValid = await page
        .getByRole("textbox", { name: "Category" })
        .evaluate((el) => el.checkValidity());
    expect(isCategoryValid).toBe(false);
    const isImageURLValid = await page
        .getByRole("textbox", { name: "Image URL" })
        .evaluate((el) => el.checkValidity());
    expect(isImageURLValid).toBe(false);
    const isDescriptionValid = await page
        .getByRole("textbox", { name: "Description" })
        .evaluate((el) => el.checkValidity());
    expect(isDescriptionValid).toBe(false);
    const isAvailableSlotsValid = await page
        .getByRole("spinbutton", { name: "Available Slots" })
        .evaluate((el) => el.checkValidity());
    expect(isAvailableSlotsValid).toBe(false);
});

test.fixme("BUG: Testing if you can add a date that has already passed", async ({
    page,
}) => {
    await loginAsAdmin(page);
    await page.goto("/admin/events/new");
    await page.getByRole("textbox", { name: "Event Title" }).click();
    await page
        .getByRole("textbox", { name: "Event Title" })
        .fill(`Fun Function ${Date.now()}`);
    await page.getByRole("textbox", { name: "Event Date" }).fill("2026-04-01");
    await page.getByRole("textbox", { name: "Location" }).click();
    await page.getByRole("textbox", { name: "Location" }).fill("Kingston, CA");
    await page.getByRole("textbox", { name: "Category" }).click();
    await page.getByRole("textbox", { name: "Category" }).fill("Programming");
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page
        .getByRole("textbox", { name: "Image URL" })
        .fill(
            "https://jessup.edu/wp-content/uploads/2023/12/Programming-in-Computer-Science-NEW.webp",
        );
    await page.getByRole("textbox", { name: "Description" }).click();
    await page
        .getByRole("textbox", { name: "Description" })
        .fill("Fun Programming");
    await page.getByRole("spinbutton", { name: "Available Slots" }).click();
    await page.getByRole("spinbutton", { name: "Available Slots" }).fill("5");
    await page.getByRole("button", { name: "Create Event" }).click();
    const isEventDateValid = await page
        .getByRole("textbox", { name: "Event Date" })
        .evaluate((el) => el.checkValidity());
    expect(isEventDateValid).toBe(false);
});

test("Testing if you can add an image with bad URL", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/events/new");
    await page.getByRole("textbox", { name: "Event Title" }).click();
    await page
        .getByRole("textbox", { name: "Event Title" })
        .fill(`Fun Function ${Date.now()}`);
    await page.getByRole("textbox", { name: "Event Date" }).fill("2026-04-29");
    await page.getByRole("textbox", { name: "Location" }).click();
    await page.getByRole("textbox", { name: "Location" }).fill("Kingston, CA");
    await page.getByRole("textbox", { name: "Category" }).click();
    await page.getByRole("textbox", { name: "Category" }).fill("Programming");
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page.getByRole("textbox", { name: "Image URL" }).fill("Test");
    await page.getByRole("textbox", { name: "Description" }).click();
    await page
        .getByRole("textbox", { name: "Description" })
        .fill("Fun Programming");
    await page.getByRole("spinbutton", { name: "Available Slots" }).click();
    await page.getByRole("spinbutton", { name: "Available Slots" }).fill("5");
    await page.getByRole("button", { name: "Create Event" }).click();
    const isImageURLValid = await page
        .getByRole("textbox", { name: "Image URL" })
        .evaluate((el) => el.checkValidity());
    expect(isImageURLValid).toBe(false);
});

test("Testing if you can add a negative number of seats", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/events/new");
    await page.getByRole("textbox", { name: "Event Title" }).click();
    await page
        .getByRole("textbox", { name: "Event Title" })
        .fill(`Fun Function ${Date.now()}`);
    await page.getByRole("textbox", { name: "Event Date" }).fill("2026-04-29");
    await page.getByRole("textbox", { name: "Location" }).click();
    await page.getByRole("textbox", { name: "Location" }).fill("Kingston, CA");
    await page.getByRole("textbox", { name: "Category" }).click();
    await page.getByRole("textbox", { name: "Category" }).fill("Programming");
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page
        .getByRole("textbox", { name: "Image URL" })
        .fill(
            "https://jessup.edu/wp-content/uploads/2023/12/Programming-in-Computer-Science-NEW.webp",
        );
    await page.getByRole("textbox", { name: "Description" }).click();
    await page
        .getByRole("textbox", { name: "Description" })
        .fill("Fun Programming");
    await page.getByRole("spinbutton", { name: "Available Slots" }).click();
    await page.getByRole("spinbutton", { name: "Available Slots" }).fill("-5");
    await page.getByRole("button", { name: "Create Event" }).click();
    const isAvailableSlotsValid = await page
        .getByRole("spinbutton", { name: "Available Slots" })
        .evaluate((el) => el.checkValidity());
    expect(isAvailableSlotsValid).toBe(false);
});

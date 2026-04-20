const { expect } = require("@playwright/test");
require("dotenv").config();

// Login Helpers
const loginAsAdmin = async (page) => {
    await page.goto("/admin/login");
    await page.getByRole("textbox", { name: "Admin Username" }).click();
    await page.getByRole("textbox", { name: "Admin Username" }).fill("admin");
    await page.getByRole("textbox", { name: "Admin Password" }).click();
    await page.getByRole("textbox", { name: "Admin Password" }).fill("admin");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.locator("section")).toContainText("Admin dashboard");
};

const loginAsUser = async (page) => {
    await page.goto("/login");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page
        .getByRole("textbox", { name: "Email Address" })
        .fill("dburnham@example.com");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("123");
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page.locator("body")).toContainText("You are now logged in.");
};

const loginAsSecondaryUser = async (page) => {
    await page.goto("/login");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page
        .getByRole("textbox", { name: "Email Address" })
        .fill("tania@example.com");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("123");
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page.locator("body")).toContainText("You are now logged in.");
};

const createTestEvent = async (page) => {
    const newEventName = `Test ${Date.now()}`;
    await page.goto("/admin/events/new");
    await page.getByRole("link", { name: "Add Event" }).click();
    await page.getByRole("textbox", { name: "Event Title" }).click();
    await page.getByRole("textbox", { name: "Event Title" }).fill(newEventName);
    await page.getByRole("textbox", { name: "Event Date" }).fill("2026-04-30");
    await page.getByRole("textbox", { name: "Location" }).click();
    await page.getByRole("textbox", { name: "Location" }).fill("Test");
    await page.getByRole("textbox", { name: "Category" }).click();
    await page.getByRole("textbox", { name: "Category" }).fill("Test");
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page.getByRole("textbox", { name: "Image URL" }).click();
    await page
        .getByRole("textbox", { name: "Image URL" })
        .fill(
            "https://jessup.edu/wp-content/uploads/2023/12/Programming-in-Computer-Science-NEW.webp",
        );
    await page.getByRole("textbox", { name: "Description" }).click();
    await page.getByRole("textbox", { name: "Description" }).fill("Test");
    await page.getByRole("spinbutton", { name: "Available Slots" }).click();
    await page.getByRole("spinbutton", { name: "Available Slots" }).fill("10");
    await page.getByRole("button", { name: "Create Event" }).click();
    await page.getByRole("button", { name: "Log Out" }).click();
    await page.getByRole("link", { name: "Return To Public Site" }).click();
    return newEventName;
};

module.exports = {
    loginAsAdmin,
    loginAsUser,
    loginAsSecondaryUser,
    createTestEvent,
};

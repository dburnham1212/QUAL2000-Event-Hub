import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto(`/register`);
});

// ============ Events Page Testing ============
test("Testing if manual navigation to register page displays the register page", async ({
    page,
}) => {
    await expect(page.getByText("Create your account")).toBeVisible();
});

test("Testing if account registration is successful", async ({ page }) => {
    await page.getByRole("textbox", { name: "Full Name" }).click();
    await page.getByRole("textbox", { name: "Full Name" }).fill("Dylan");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page
        .getByRole("textbox", { name: "Email Address" })
        .fill(`dburnham${Date.now()}@example.com`);
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("123");
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page.getByText("Your account has been created")).toBeVisible();
});

test("Testing if duplicate account registration is unsuccessful", async ({
    page,
}) => {
    await page.getByRole("textbox", { name: "Full Name" }).click();
    await page.getByRole("textbox", { name: "Full Name" }).fill("Dylan");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page
        .getByRole("textbox", { name: "Email Address" })
        .fill("dburnham@example.com");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("123");
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page.locator("section")).toContainText(
        "An account already exists for that email address.",
    );
});

test('Testing if clicking on "Already Have An Account" button takes you to the login page', async ({
    page,
}) => {
    await page.getByRole("link", { name: "Already Have An Account?" }).click();
    await expect(page.getByRole("heading")).toContainText(
        "Log in to manage your events.",
    );
});

test("Testing if registration works with empty name field", async ({
    page,
}) => {
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page.getByRole("button", { name: "Create Account" }).click();
    const isValid = await page
        .getByRole("textbox", { name: "Full Name" })
        .evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);
});

test("Testing if registration works with empty email field", async ({
    page,
}) => {
    await page.getByRole("textbox", { name: "Full Name" }).fill("dylan");
    await page.getByRole("button", { name: "Create Account" }).click();
    const isValid = await page
        .getByRole("textbox", { name: "Email Address" })
        .evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);
});

test("Testing if registration works with invalid email in field", async ({
    page,
}) => {
    await page.getByRole("textbox", { name: "Full Name" }).fill("dylan");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page.getByRole("textbox", { name: "Email Address" }).fill("dburnham");
    await page.getByRole("button", { name: "Create Account" }).click();
    const isValid = await page
        .getByRole("textbox", { name: "Email Address" })
        .evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);
});

test("Testing if registration works with empty password field", async ({
    page,
}) => {
    await page.getByRole("textbox", { name: "Full Name" }).fill("dylan");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page
        .getByRole("textbox", { name: "Email Address" })
        .fill("dburnham@example.com");
    await page.getByRole("button", { name: "Create Account" }).click();
    const isValid = await page
        .getByRole("textbox", { name: "Password" })
        .evaluate((el) => el.checkValidity());
    expect(isValid).toBe(false);
});

test.fixme("BUG: Testing if registration works with special characters", async ({
    page,
}) => {
    await page.getByRole("textbox", { name: "Full Name" }).fill("%%");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page
        .getByRole("textbox", { name: "Email Address" })
        .fill("%%@example.com");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("123");
    await page.getByRole("button", { name: "Create Account" }).click();
    const isNameValid = await page
        .getByRole("textbox", { name: "Full Name" })
        .evaluate((el) => el.checkValidity());
    expect(isNameValid).toBe(false);
    const isEmailValid = await page
        .getByRole("textbox", { name: "Email Address" })
        .evaluate((el) => el.checkValidity());
    expect(isEmailValid).toBe(false);
});

test("Testing if registration works with bad email (@@example.com)", async ({
    page,
}) => {
    await page.getByRole("textbox", { name: "Full Name" }).fill("dylan");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page
        .getByRole("textbox", { name: "Email Address" })
        .fill("@@example.com");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("123");
    await page.getByRole("button", { name: "Create Account" }).click();
    const isEmailValid = await page
        .getByRole("textbox", { name: "Email Address" })
        .evaluate((el) => el.checkValidity());
    expect(isEmailValid).toBe(false);
});

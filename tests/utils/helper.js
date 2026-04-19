const { expect } = require('@playwright/test');
require('dotenv').config();

// Login Helpers
const loginAsAdmin = async (page) => {
    await page.goto('/admin/login');
    await page.getByRole('textbox', { name: 'Admin Username' }).click();
    await page.getByRole('textbox', { name: 'Admin Username' }).fill('admin');
    await page.getByRole('textbox', { name: 'Admin Password' }).click();
    await page.getByRole('textbox', { name: 'Admin Password' }).fill('admin');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('section')).toContainText('Admin dashboard');
}

const loginAsUser = async (page) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Email Address' }).click();
    await page.getByRole('textbox', { name: 'Email Address' }).fill('dburnham@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('123');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.locator('body')).toContainText('You are now logged in.');
}

module.exports = {
    loginAsAdmin,
    loginAsUser
}
import { test, expect } from '@playwright/test';
import { User } from 'shared/db-models.interface';
import { usersMock } from 'shared/users-mock';

const validUser: User = {
  name: 'John Smith',
  email: 'johnsmith@gmail.com',
  phone: '+972555555555',
  website: 'google.com'
}

test.describe('UserManagementComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/user-management');
    await page.getByText('Loading...').waitFor({ state: 'detached' });
  });

  test('should load all users on init', async ({ page }) => {
    const users = await page.getByTestId("user-row").all();
    await expect(users.length).toBeGreaterThan(0);
  });

  test('should filter users', async ({ page }) => {
    await page.getByTestId("search-input").pressSequentially(usersMock[0].name, { delay: 100 });
    const filteredUsers = await page.getByTestId("user-row").all();
    await expect(filteredUsers.length).toBe(1);
  });

  test('should change view mode to tiles', async ({ page }) => {
    await page.getByTestId("view-mode-table").click();
    const tiles = await page.getByTestId("user-tile").all();
    await expect(tiles.length).toBe(0);
    const rows = await page.getByTestId("user-row").all();
    await expect(rows.length).toBe(5);
  });

  test('should change view mode to table', async ({ page }) => {
    await page.getByTestId("view-mode-grid").click();
    await page.getByTestId("view-mode-grid").click();
    const rows = await page.getByTestId("user-row").all();
    await expect(rows.length).toBe(0);
    const tiles = await page.getByTestId("user-tile").all();
    await expect(tiles.length).toBe(5);
  });

  test('should open modal to create a new user', async ({ page }) => {
    await page.getByTestId("create-user-button").click();
    await expect(page.getByTestId("user-modal")).toBeVisible();
  });

  test('should open modal to update a user', async ({ page }) => {
    await page.getByTestId("user-row").first().dblclick()
    await expect(page.getByTestId("user-modal")).toBeVisible();
  });

  test('should handle form submit for new user', async ({ page }) => {
    await page.getByTestId("create-user-button").click();
    const modal = await page.getByTestId("user-modal");
    await modal.waitFor({ state: 'visible' })
    await page.fill('[data-testid="user-form-name"]', validUser.name)
    await page.fill('[data-testid="user-form-email"]', validUser.email)
    await page.fill('[data-testid="user-form-website"]', validUser.website)
    await page.fill('[data-testid="user-form-phone"]', validUser.phone)
    await page.getByTestId("user-form-save").click();
    await modal.waitFor({ state: 'hidden' })
    await page.getByTestId("search-input").pressSequentially(validUser.name, { delay: 100 });
    const filteredUsers = await page.getByTestId("user-row").all();
    await expect(filteredUsers.length).toBe(1);
  });

  test('should handle form submit for updating user', async ({ page }) => {
    await page.getByTestId("search-input").pressSequentially(usersMock[0].name, { delay: 100 });
    await page.getByTestId("user-row").first().dblclick();
    await expect(page.getByTestId("user-modal")).toBeVisible();
    await expect(page.getByTestId("user-form-name")).toHaveValue(usersMock[0].name);
    await expect(page.getByTestId("user-form-email")).toHaveValue(usersMock[0].email);
    await expect(page.getByTestId("user-form-phone")).toHaveValue(usersMock[0].phone);
    await expect(page.getByTestId("user-form-website")).toHaveValue(usersMock[0].website);
    await page.fill('[data-testid="user-form-phone"]', validUser.phone);
    await page.getByTestId("user-form-save").click();
    await page.getByTestId("user-modal").waitFor({ state: 'hidden' })
    await expect(page.getByTestId("user-row").first().getByText(validUser.phone)).toBeVisible();
  });

  test('should delete a user', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    await page.getByTestId("search-input").pressSequentially(usersMock[0].name, { delay: 100 });
    await page.getByTestId("user-row").first().dblclick();
    await page.getByTestId("user-form-delete").click();
    const filteredUsers = await page.getByTestId("user-row").all();
    await expect(filteredUsers.length).toBe(0);
  });
});

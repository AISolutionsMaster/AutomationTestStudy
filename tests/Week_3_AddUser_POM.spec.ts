import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UserListPage } from './pages/UserListPage';
import { AddUserPage } from './pages/AddUserPage';

test.describe('Add New User Test Suite', () => {
  test.beforeEach(async ({ page}) => {
  })

  test('Verify User Role field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await dashboardPage.goToMenu('Admin');

    const userListPage = new UserListPage(page);
    await userListPage.isLoaded();
    await userListPage.addButton.click();

    const addNewUserPage = new AddUserPage(page);
    await addNewUserPage.isLoaded();

    //Verify User Role = Blank
    await addNewUserPage.getErrorMessage('User Role').isVisible();

    //Verify User Role list item
    await addNewUserPage.verifyDropdown('User Role', ['Select', 'Admin', 'ESS']);
  })

  test('Verify Employee Name field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await dashboardPage.goToMenu('Admin');

    const userListPage = new UserListPage(page);
    await userListPage.isLoaded();
    await userListPage.addButton.click();

    const addNewUserPage = new AddUserPage(page);
    await addNewUserPage.isLoaded();

    //Verify Status = Blank
    await addNewUserPage.getErrorMessage('Employee Name').isVisible();

    // Verify placeholder text
    const inputField = page.getByPlaceholder('Type for hints...');
    await expect(inputField).toHaveAttribute('placeholder', 'Type for hints...');
})

  test('Verify Status field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await dashboardPage.goToMenu('Admin');

    const userListPage = new UserListPage(page);
    await userListPage.isLoaded();
    await userListPage.addButton.click();

    const addNewUserPage = new AddUserPage(page);
    await addNewUserPage.isLoaded();

    //Verify Status = Blank
    await addNewUserPage.getErrorMessage('Status').isVisible();

    //Verify Status list item
    await addNewUserPage.verifyDropdown('Status', ['Select', 'Enabled', 'Disabled']);
})

test('Verify Username field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.isLoaded();
  await dashboardPage.goToMenu('Admin');

  const userListPage = new UserListPage(page);
  await userListPage.isLoaded();
  await userListPage.addButton.click();

  const addNewUserPage = new AddUserPage(page);
  await addNewUserPage.isLoaded();

  //Verify Username = Blank
  await addNewUserPage.username.fill('');
  await addNewUserPage.saveButton.click();
  await addNewUserPage.getErrorMessage('Username').isVisible();
  let Username_ErrorMessage = await addNewUserPage.getErrorMessage('Username').textContent();
  expect(Username_ErrorMessage).toBe('Required');

  //Verify hiển thị thông báo lỗi nếu nhập < 5 ký tự
  await addNewUserPage.username.fill('111');
  Username_ErrorMessage = await addNewUserPage.getErrorMessage('Username').textContent();
  expect(Username_ErrorMessage).toBe('Should be at least 5 characters');

  //Verify hiển thị thông báo lỗi nếu nhập > 40 ký tự
  await addNewUserPage.username.fill('11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
  Username_ErrorMessage = await addNewUserPage.getErrorMessage('Username').textContent();
  expect(Username_ErrorMessage).toBe('Should not exceed 40 characters');

  //Verify hiển thị thông báo lỗi nếu Username đã tồn tại
  await addNewUserPage.username.fill('Admin');
  await page.waitForTimeout(2000);
  Username_ErrorMessage = await addNewUserPage.getErrorMessage('Username').textContent();
  await page.waitForTimeout(2000);
  expect(Username_ErrorMessage).toBe('Already exists');
})

test('Verify Password field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.isLoaded();
  await dashboardPage.goToMenu('Admin');

  const userListPage = new UserListPage(page);
  await userListPage.isLoaded();
  await userListPage.addButton.click();

  const addNewUserPage = new AddUserPage(page);
  await addNewUserPage.isLoaded();

  //Verify Password = Blank
  await addNewUserPage.password.fill('');
  await addNewUserPage.saveButton.click();
  await addNewUserPage.getErrorMessage('Password').isVisible();
  let Password_ErrorMessage = await addNewUserPage.getErrorMessage('Password').textContent();
  expect(Password_ErrorMessage).toBe('Required');

  //Verify hiển thị thông báo lỗi nếu nhập < 7 ký tự
  await addNewUserPage.password.fill('1');
  await page.waitForTimeout(2000);
  Password_ErrorMessage = await addNewUserPage.getErrorMessage('Password').textContent();
  expect(Password_ErrorMessage).toBe('Should have at least 7 characters');
  
  //Verify hiển thị thông báo lỗi nếu nhập > 64 ký tự
  await addNewUserPage.password.fill('11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
  await page.waitForTimeout(2000);
  Password_ErrorMessage = await addNewUserPage.getErrorMessage('Password').textContent();
  expect(Password_ErrorMessage).toBe('Should not exceed 64 characters');

  //Verify hiển thị thông báo lỗi nếu Password không chứa lower-case
  await addNewUserPage.password.fill('11111111');
  await page.waitForTimeout(3000);
  Password_ErrorMessage = await addNewUserPage.getErrorMessage('Password').textContent();
  expect(Password_ErrorMessage).toBe('Your password must contain minimum 1 lower-case letter');
})

  test('Verify Add New User successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await dashboardPage.goToMenu('Admin');

    const userListPage = new UserListPage(page);
    await userListPage.isLoaded();
    await userListPage.addButton.click();

    const addNewUserPage = new AddUserPage(page);
    await addNewUserPage.isLoaded();
    await addNewUserPage.selectDropdown('User Role', 'ESS');
    await addNewUserPage.selectDropdown('Status', 'Enabled');
    await addNewUserPage.selectEmployeeName('Timo');
    await addNewUserPage.username.fill('HaTest');
    await addNewUserPage.password.fill('HaTest@123');
    await addNewUserPage.confirmPassword.fill('HaTest@123');
    await addNewUserPage.saveButton.click();
    await addNewUserPage.getRequiredFieldErrorMessage('User Role').isVisible();

    //Verify Successful message
    await expect(page.getByText('Successfully Saved')).toBeVisible();

    //Verify display added user at User List page
    await userListPage.isLoaded();
    await userListPage.username.fill('HaTest');
    await userListPage.searchButton.click();
    await userListPage.verifyUserInTable('HaTest','ESS','Timothy Amiano','Enabled');

  })

  test('Verify Delete New User successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await dashboardPage.goToMenu('Admin');

    const userListPage = new UserListPage(page);
    await userListPage.isLoaded();
   
    await userListPage.username.fill('HaTest');
    await userListPage.searchButton.click();
  })

})  
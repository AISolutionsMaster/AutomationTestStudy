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
    await loginPage.login(process.env.userName ?? '', process.env.password ?? '');

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
    await loginPage.login(process.env.userName ?? '', process.env.password ?? '');

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
    await loginPage.login(process.env.userName ?? '', process.env.password ?? '');

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
  await loginPage.login(process.env.userName ?? '', process.env.password ?? '');

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
  await expect(addNewUserPage.getErrorMessage('Username')).toHaveText('Required');

  //Verify hiển thị thông báo lỗi nếu nhập < 5 ký tự
  await addNewUserPage.username.fill('111');
  await expect(addNewUserPage.getErrorMessage('Username')).toHaveText('Should be at least 5 characters');

  //Verify hiển thị thông báo lỗi nếu nhập > 40 ký tự
  await addNewUserPage.username.fill('11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
  await expect(addNewUserPage.getErrorMessage('Username')).toHaveText('Should not exceed 40 characters');

  //Verify hiển thị thông báo lỗi nếu Username đã tồn tại
  await addNewUserPage.username.fill('Admin');
  await expect(addNewUserPage.getErrorMessage('Username')).toHaveText('Already exists');
})

test('Verify Password field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.userName ?? '', process.env.password ?? '');

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
  await expect(addNewUserPage.getErrorMessage('Password')).toHaveText('Required');

  //Verify hiển thị thông báo lỗi nếu nhập < 7 ký tự
  await addNewUserPage.password.fill('1');
  await expect(addNewUserPage.getErrorMessage('Password')).toHaveText('Should have at least 7 characters');

  //Verify hiển thị thông báo lỗi nếu nhập > 64 ký tự
  await addNewUserPage.password.fill('11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
  await expect(addNewUserPage.getErrorMessage('Password')).toHaveText('Should not exceed 64 characters');

  //Verify hiển thị thông báo lỗi nếu Password không chứa lower-case
  await addNewUserPage.password.fill('11111111');
  await expect(addNewUserPage.getErrorMessage('Password')).toHaveText('Your password must contain minimum 1 lower-case letter');

})

test('Verify Confirm Password field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.userName ?? '', process.env.password ?? '');

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.isLoaded();
  await dashboardPage.goToMenu('Admin');

  const userListPage = new UserListPage(page);
  await userListPage.isLoaded();
  await userListPage.addButton.click();

  const addNewUserPage = new AddUserPage(page);
  await addNewUserPage.isLoaded();

  //Verify Confirm Password NOT match with Password
  await addNewUserPage.password.fill('');
  await addNewUserPage.confirmPassword.fill('');
  await addNewUserPage.saveButton.click();
  await expect(addNewUserPage.getErrorMessage('Confirm Password')).toHaveText('Your password must contain minimum 1 lower-case letter');
})

  test('Verify Add New User successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.userName ?? '', process.env.password ?? '');

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
    await addNewUserPage.selectEmployeeName(process.env.employeeFullName ?? '');
    await addNewUserPage.username.fill(process.env.newUserName ?? '');
    await addNewUserPage.password.fill(process.env.password ?? '');
    await addNewUserPage.confirmPassword.fill(process.env.password ?? '');
    await addNewUserPage.saveButton.click();
    //await addNewUserPage.getErrorMessage('User Role').isVisible();

    //Verify Successful message
    await expect(addNewUserPage.getSuccessfullMessage).toContainText('Successfully Saved');

    //Verify display added user at User List page
    await userListPage.isLoaded();
    await userListPage.username.fill(process.env.newUserName ?? '');
    await userListPage.searchButton.click();
    await userListPage.verifyUserInTable(process.env.newUserName ?? '','ESS',process.env.employeeName ?? '','Enabled');
  })

  test('Verify Delete New User successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.userName ?? '', process.env.password ?? '');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await dashboardPage.goToMenu('Admin');

    const userListPage = new UserListPage(page);
    await userListPage.isLoaded();
   
    await userListPage.username.fill(process.env.newUserName ?? '');
    await userListPage.searchButton.click();

    await userListPage.verifyUserInTable(process.env.newUserName ?? '','ESS', process.env.employeeName ?? '','Enabled');
    await userListPage.DeleteButton.click();
    await page.locator("//button[normalize-space()='Yes, Delete']/..//button[normalize-space()='Yes, Delete']").click();
  })

})  
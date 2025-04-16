import { Page, Locator, expect } from '@playwright/test';
import { SidebarMenu } from './layout/SidebarMenu';
import { HeaderBar } from './layout/HeaderBar';
import { SubMenuBar } from './layout/SubMenuBar';

export class BasePage {
    readonly sidebar: SidebarMenu;
    readonly headerbar: HeaderBar;
    readonly submenu: SubMenuBar;
    readonly container: Locator;

    constructor(protected readonly page: Page) {
        this.sidebar = new SidebarMenu(page);
        this.headerbar = new HeaderBar(page);
        this.submenu = new SubMenuBar(page);
        this.container = page.locator('.oxd-layout-context');
    }

    get getSuccessfullMessage(){
        return this.page.locator('.oxd-toast-content--success .oxd-toast-content-text')
    }

    async goToMenu(menuName: string) {
        await this.sidebar.clickMenuItem(menuName);
    }

    async logout(): Promise<void> {
        await this.headerbar.logout();
        await this.verifyRedirectedToLogin();
    }

    async verifyRedirectedToLogin() {
        await expect(this.page).toHaveURL(/auth\/login/);
        await this.page.waitForLoadState('load');
    }

    async verifyPageTitle(expectedTitle: string): Promise<void> {
        await this.headerbar.verifyPageTitle(expectedTitle);
    }

    async verifyModuleTitle(expectedTitle: string): Promise<void> {
        await this.headerbar.verifyModuleTitle(expectedTitle);
    }

    async clickSubMenuItem(mainTab: string, subItem?: string): Promise<void> {
        await this.submenu.clickSubMenuItem(mainTab, subItem);
    }

    async verifyLayoutHasSubMenu(hasSubmenu: boolean = true) {
        await expect(this.sidebar.container).toBeVisible();
        await expect(this.headerbar.container).toBeVisible();

        if (hasSubmenu) {
            await expect(this.submenu.container).toBeVisible();
        } else {
        await expect(this.submenu.container).toBeHidden();
        }
    }

    async waitForLayoutReady() {
        await Promise.all([
            this.sidebar.container.waitFor({ state: 'visible' }),
            this.headerbar.container.waitFor({ state: 'visible' })
        ]);
    }
}
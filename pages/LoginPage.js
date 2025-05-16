class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.signInButton = '#signInBtn';
    }

    async navigateTo() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.signInButton);
        await this.page.waitForNavigation();
    }
}

module.exports = LoginPage;

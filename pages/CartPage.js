class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = 'button.btn.btn-success';
        this.countryInput = '#country';
        this.countryDropdown = '.suggestions a';
        this.termsCheckbox = '#checkbox2';
        this.purchaseButton = 'input[value="Purchase"]';
        this.successMessage = '.alert-success';
    }

    async verifyProductInCart(productName) {
        const cartProductSelector = `.cart h4:has-text("${productName}")`;
        return await this.page.isVisible(cartProductSelector);
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async verifyProductInCheckout(productName) {
        const checkoutProductSelector = `td:has-text("${productName}")`;
        return await this.page.isVisible(checkoutProductSelector);
    }

    async enterDeliveryLocation(country) {
        await this.page.fill(this.countryInput, country);
        // await this.page.waitForSelector(this.countryDropdown, { state: 'visible' });
        // await this.page.click(this.countryDropdown);
    }

    async acceptTermsAndPurchase() {
        // Wait for terms checkbox to be visible and click it
        await this.page.waitForSelector(this.termsCheckbox, { state: 'visible' });
        await this.page.click(this.termsCheckbox);
        
        // Wait for purchase button to be actionable and click it
        await this.page.waitForSelector(this.purchaseButton, { state: 'visible' });
        await this.page.click(this.purchaseButton);
    }

    async getSuccessMessage() {
        await this.page.waitForSelector(this.successMessage, { state: 'visible', timeout: 10000 });
        return await this.page.textContent(this.successMessage);
    }
}

module.exports = CartPage;

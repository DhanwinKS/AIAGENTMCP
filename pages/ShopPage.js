class ShopPage {
    constructor(page) {
        this.page = page;
        this.cartLink = ".nav-link.btn.btn-primary";
    }

    async addProductToCart(productName) {
        const productCard = `.card-body h4:has-text("${productName}")`;
        const addToCartButton = `.card:has(${productCard}) button.btn-info`;
        await this.page.click(addToCartButton);
    }

    async goToCart() {
        await this.page.click(this.cartLink);
    }
}

module.exports = ShopPage;

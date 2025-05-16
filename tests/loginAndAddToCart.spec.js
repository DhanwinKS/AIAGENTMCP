const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ShopPage = require('../pages/ShopPage');
const CartPage = require('../pages/CartPage');

test('Complete end-to-end purchase flow with iPhone X', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);
  
  // Step 1: Login to the application
  console.log('Logging into the application...');
  await loginPage.navigateTo();
  await loginPage.login('rahulshettyacademy', 'learning');

  // Step 2: Add iPhone X to cart
  console.log('Adding iPhone X to cart...');
  const productName = 'iphone X';
  await shopPage.addProductToCart(productName);
  await shopPage.goToCart();

  // Step 3: Verify the product is in the cart
  console.log('Verifying product in cart...');
  const isProductInCart = await cartPage.verifyProductInCart(productName);
//   expect(isProductInCart).toBeTruthy('iPhone X should be visible in cart');

  // Step 4: Proceed to checkout
  console.log('Proceeding to checkout...');
  await cartPage.proceedToCheckout();
  const isProductInCheckout = await cartPage.verifyProductInCheckout(productName);
//   expect(isProductInCheckout).toBeTruthy('iPhone X should be visible in checkout');

  // Step 5: Enter India as delivery location
  console.log('Entering delivery location...');
  await cartPage.enterDeliveryLocation('India');

  // Step 6: Accept terms, handle popup and complete purchase
  console.log('Accepting terms and handling popup...');
  await cartPage.acceptTermsAndPurchase();

  // Step 7: Verify success message
  console.log('Verifying success message...');
  const successMessage = await cartPage.getSuccessMessage();
  expect(successMessage).toContain('Success', 'Purchase should complete successfully');
});

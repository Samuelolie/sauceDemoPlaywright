const { expect } = require('@playwright/test')

export class Store {
    constructor(page) {
        this.page = page
    }

    async addShoppingCart(product) {

        await this.page.locator('.inventory_item')
            .filter({ hasText: product })
            .locator('button:has-text("Add to cart")')
            .click();

    }

    async removeShoppingCart(product){
        const productReplace = product.toLowerCase().replace(/\s+/g, '-');

        await this.page.locator(`#remove-${productReplace}`)
            .click()
    }

    async verifyShoppingCart(product){

        await this.page.locator('#shopping_cart_container')
            .click()
        await expect(this.page.locator('.inventory_item_name'))
            .toHaveText(product)
    
    }
}
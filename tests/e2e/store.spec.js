import { test, expect } from '@playwright/test';
require('dotenv').config()

const { Login } = require('../page/Login')
const { Store } = require('../page/Store')

let login
let store

test.beforeEach(async({ page }) =>{
    login = new Login(page)
    store = new Store (page)
})

test('Adicionar item no carrinho', async({ page })=>{
    const user = process.env.SUCESSUSER
    const password = process.env.PASSWORD
    const product = 'Sauce Labs Fleece Jacket';
    console.log(user, password)
    
    await login.loginDemo(user, password)
    await store.addShoppingCart(product)
    await store.verifyShoppingCart(product)
})

test('Remover item no carrinho', async({ page })=>{
    const user = process.env.SUCESSUSER
    const password = process.env.PASSWORD
    const product = 'Sauce Labs Fleece Jacket';
    console.log(user, password)
    
    await login.loginDemo(user, password)
    await store.addShoppingCart(product)
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
    
    await store.removeShoppingCart(product)
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0)
})

import { test, expect} from '@playwright/test';
require('dotenv').config()

const { Login } = require('../page/Login')

let login

test.beforeEach(async({ page }) =>{
    login = new Login(page)
    
})

test('Login com sucesso', async({ page })=>{
    const user = process.env.SUCESSUSER
    const password = process.env.PASSWORD

    console.log(user, password)
    await login.loginDemo(user, password)

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})

test('Login com usuário bloqueado', async({})=>{
    const user = process.env.BLOCKUSER
    const password = process.env.PASSWORD

    await login.loginDemo(user, password)

    await login.checkMessage('block')
})

test('Login com usuário incorreto', async({})=>{
    const user = process.env.BLOCKUSER
    const password = process.env.BLOCKUSER

    await login.loginDemo(user, password)

    await login.checkMessage('incorrect')
})

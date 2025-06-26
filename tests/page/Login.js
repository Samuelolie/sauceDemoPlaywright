const { expect } = require('@playwright/test')
const data = require('../support/fixtures/message.json')

export class Login{
    constructor(page){
        this.page = page
    }

    async loginDemo(user, password){
        await this.page.goto('https://www.saucedemo.com/')

        await this.page.fill('#user-name', user)
        await this.page.fill('#password', password)

        await this.page.click('#login-button')
    }

    async checkMessage(message){
        switch(message){
            case 'block': 
                await expect(this.page.locator('//h3')).toHaveText(data.messageblock)
            break

            case 'incorrect':
                await expect(this.page.locator('//h3')).toHaveText(data.messagepassword)
            break

            default:
                return 'Mensagem não encontrada'
        }
    }
}
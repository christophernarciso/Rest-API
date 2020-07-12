import {Controller, Get, Render} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    @Render('index')
    root() {
        return {
            brand: 'REST API',
            title: 'Testing environment for NestJS development',
            loggedIn: null
        };
    }

    @Get('/login')
    @Render('login')
    loginHandler() {
        return {
            brand: 'REST API',
            title: 'LOGIN FORM',
            loggedIn: null
        };
    }

}

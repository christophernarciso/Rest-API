import {Controller, Get, Post, Request, Render, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import { AuthGuard } from '@nestjs/passport';
import {UserService} from "./user/user.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    @Render('index')
    async login(@Request() req) {
        // TODO: Figure out how to save the loggedIn user state so I can logout. For static Model View Controller
        return {
            brand: 'REST API',
            title: 'Testing environment for NestJS development',
            loggedIn: req.user.username
        };
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

    @Get('/signup')
    @Render('signup')
    createHandler() {
        return {
            brand: 'REST API',
            title: 'SIGNUP FORM',
            loggedIn: null
        };
    }

}

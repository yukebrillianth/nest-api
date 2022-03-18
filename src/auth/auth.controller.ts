import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { SignInDto, SingUpDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: SingUpDto) {
        return this.authService.signup(dto);
    }


    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(@Body() dto: SignInDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.signin(dto);

        res.cookie('access_token', token["access_token"], { secure: true, httpOnly: true, maxAge: 900 })
        return token;
    }

    @Post('logout')
    logout() {
        return this.authService.logout();
    }

    @Post('refresh')
    refresh() {
        return this.authService.refreshToken();
    }
}
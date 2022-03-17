import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signup() {
        return {
            message: "Yuke sudah signup!"
        };
    }

    signin() {
        return {
            message: "Yuke sudah signin!"
        };
    }
}
import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(username: string, password: string): Promise<{ id: number; username: string }> {
        const user = await this.userService.findUser(username);
        const verified = await this.userService.isValidUserData(user.password, password);
        if (user && verified) {
            return {id: user.id, username: user.username};
        }
        return null;
    }
}

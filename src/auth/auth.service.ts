import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(id: number, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(id);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.name };
        return {
            // 💡 Here the JWT secret key that's used for signing the payload 
            // is the key that was passsed in the JwtModule
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

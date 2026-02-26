import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService) {}

    async signUp(createUserDto: CreateUserDto) {
        const saltOrRounds = Number(this.configService.get<number>('auth.salt_or_rounds', 10));
        const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

        const user = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });
        const payload = { sub: user.id, username: user.name };
        return {
            // 💡 Here the JWT secret key that's used for signing the payload 
            // is the key that was passsed in the JwtModule
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signIn(id: number, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(id);
        if (user === null) {
            throw new UnauthorizedException();
        }

        if (!await bcrypt.compare(password, user.password)) {
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

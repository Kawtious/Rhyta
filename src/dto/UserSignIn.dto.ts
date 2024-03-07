import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignInDto {
    @IsNotEmpty()
    username!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;
}

import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @ApiProperty({
        name: 'username',
        description: 'The username of the User',
        nullable: false,
        type: String
    })
    username!: string;

    @IsEmail()
    @ApiProperty({
        name: 'email',
        description: 'The email of the User',
        nullable: false,
        type: String
    })
    email!: string;

    @IsNotEmpty()
    @ApiProperty({
        name: 'password',
        description: 'The password of the User',
        nullable: false,
        type: String
    })
    password!: string;
}

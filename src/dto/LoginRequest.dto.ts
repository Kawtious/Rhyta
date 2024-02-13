import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
    @IsNotEmpty()
    @ApiProperty({
        name: 'identifier',
        description: 'The identifier of the User',
        nullable: false,
        type: String
    })
    identifier!: string;

    @IsNotEmpty()
    @ApiProperty({
        name: 'password',
        description: 'The password of the User',
        nullable: false,
        type: String
    })
    password!: string;
}

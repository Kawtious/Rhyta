import { ApiProperty } from '@nestjs/swagger';

export class JwtAuthResponseDto {
    @ApiProperty({
        name: 'accessToken',
        description: 'Access token',
        type: String
    })
    accessToken!: string;

    @ApiProperty({
        name: 'tokenType',
        description: 'Token type (Bearer)',
        type: String
    })
    tokenType!: string;
}

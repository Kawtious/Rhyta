import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CareerDto {
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        name: 'version',
        description: 'The version of the resource',
        nullable: false,
        type: Number
    })
    version?: number;

    @IsNotEmpty()
    @ApiProperty({
        name: 'name',
        description: 'The name of the Career',
        nullable: false,
        type: String
    })
    name!: string;

    @IsOptional()
    @ApiPropertyOptional({
        name: 'description',
        description: 'The description of the Career',
        nullable: true,
        type: String
    })
    description?: string;
}

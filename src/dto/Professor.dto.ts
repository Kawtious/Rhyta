import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProfessorDto {
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
        description: 'The name of the Professor',
        nullable: false,
        type: String
    })
    name!: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CourseDto {
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
        description: 'The name of the Course',
        nullable: false,
        type: String
    })
    name!: string;

    @IsOptional()
    @ApiPropertyOptional({
        name: 'description',
        description: 'The description of the Course',
        nullable: true,
        type: String
    })
    description?: string;

    @IsInt()
    @ApiProperty({
        name: 'careerId',
        description: 'The Career that the Course belongs to',
        nullable: false,
        type: Number
    })
    careerId!: number;
}

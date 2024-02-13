import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { IsDateAfter } from '../decorators/IsDateAfter.decorator';
import { IsDateBefore } from '../decorators/IsDateBefore.decorator';

export class TermDto {
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
        name: 'title',
        description: 'The title of the Term',
        nullable: false,
        type: String
    })
    title!: string;

    @IsOptional()
    @ApiPropertyOptional({
        name: 'description',
        description: 'The description of the Term',
        nullable: true,
        type: String
    })
    description?: string;

    @IsDate()
    @IsDateBefore('endDate')
    @ApiProperty({
        name: 'startDate',
        description: 'The starting date of the Term',
        nullable: false,
        type: Date
    })
    @Type(() => Date)
    startDate!: Date;

    @IsDate()
    @IsDateAfter('startDate')
    @ApiProperty({
        name: 'endDate',
        description: 'The ending date of the Term',
        nullable: false,
        type: Date
    })
    @Type(() => Date)
    endDate!: Date;
}

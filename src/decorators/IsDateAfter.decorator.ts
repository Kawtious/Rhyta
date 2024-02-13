import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsDateAfterConstraint implements ValidatorConstraintInterface {
    validate(value: Date, args: ValidationArguments) {
        const otherDate = (args.object as Record<string, unknown>)[
            args.constraints[0]
        ] as Date;

        return value && value.valueOf() > otherDate.valueOf();
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} cannot be after ${args.constraints[0]}`;
    }
}

export function IsDateAfter(
    property: string,
    validationOptions?: ValidationOptions
) {
    return function (object: NonNullable<unknown>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsDateAfterConstraint
        });
    };
}

import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsOwnerNotConflictingConstraint
    implements ValidatorConstraintInterface
{
    validate(value: number, args: ValidationArguments) {
        const otherOwner = (args.object as Record<string, unknown>)[
            args.constraints[0]
        ] as number;

        return Boolean(value && !otherOwner.valueOf());
    }

    defaultMessage(args: ValidationArguments) {
        return `Object can only have one owner: ${args.property} conflicts with ${args.constraints[0]}`;
    }
}

export function IsOwnerNotConflicting(
    property: string,
    validationOptions?: ValidationOptions
) {
    return function (object: NonNullable<unknown>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsOwnerNotConflictingConstraint
        });
    };
}

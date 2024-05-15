import { SetMetadata, applyDecorators } from '@nestjs/common';

import { Permission } from '../enums/Permission.enum';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...roles: Permission[]) =>
    applyDecorators(SetMetadata(PERMISSIONS_KEY, roles));

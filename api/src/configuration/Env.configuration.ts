import { ConfigModuleOptions } from '@nestjs/config';

import Joi from 'joi';

export const EnvConfiguration: ConfigModuleOptions = {
    isGlobal: true,
    cache: true,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string()
            .valid('development', 'production', 'test', 'provision')
            .default('development'),
        SERVER_PORT: Joi.number().port().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().port().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(true)
    }),
    validationOptions: {
        allowUnknown: true,
        abortEarly: true
    }
};

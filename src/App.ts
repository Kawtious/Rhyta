import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule
} from '@nestjs/swagger';

import helmet from 'helmet';

import { CorsConfiguration } from './configuration/Cors.configuration';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { AppModule } from './modules/App.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.enableCors(CorsConfiguration);

    app.use(helmet());

    const apiPath = 'rhyta/api';

    app.setGlobalPrefix(apiPath);

    app.enableVersioning({
        type: VersioningType.URI
    });

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            methodKey
    };

    const config = new DocumentBuilder()
        .setTitle('Rhyta API')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header'
            },
            'JWT-auth'
        )
        .build();

    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup(apiPath, app, document);

    const port = configService.get<number>('SERVER_PORT')!;

    return app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

(async () => {
    await bootstrap();
})();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const transform_response_interceptor_1 = require("./interceptor/transform-response.interceptor");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const options = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    };
    app.enableCors(options);
    app.use(cookieParser());
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix(configService.get('app.apiPrefix'), {
        exclude: ['/'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    app.useGlobalInterceptors(new transform_response_interceptor_1.TransformResponseInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Chat Backend')
        .setDescription('Chat Backend')
        .setVersion('1.0')
        .addBearerAuth({
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const swaggerCustomOptions = {
        swaggerOptions: { displayRequestDuration: true },
    };
    swagger_1.SwaggerModule.setup('chat-docs', app, document, swaggerCustomOptions);
    await app.listen(configService.get('app.port'));
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path = require("path");

async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));

    // SÓ CARREGA O SWAGGER SE NÃO FOR PRODUÇÃO/STAGE
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'stage') {
        const swagger_1 = require("@nestjs/swagger");
        const fs = require("fs");

        const config = new swagger_1.DocumentBuilder()
            .setTitle('Typescript CRUD API - LOCAL')
            .setDescription('Documentação visível apenas localmente')
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const document = swagger_1.SwaggerModule.createDocument(app, config);
        
        // Setup dinâmico para rodar no http://localhost:3000/docs
        swagger_1.SwaggerModule.setup('docs', app, document);
        
        console.log('Ambiente Local: Swagger ativado em /docs');
    } else {
        console.log('Ambiente de Servidor: Swagger desativado para performance e segurança.');
    }

    await app.listen(process.env.PORT || 3001);
}

bootstrap().catch(err => {
    console.error('Erro no Bootstrap:', err);
});